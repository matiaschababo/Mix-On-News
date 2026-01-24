import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { auth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

/**
 * POST - Record a user interaction (like, read, dislike)
 */
export async function POST(request: Request) {
    try {
        const session = await auth();

        if (!session || !session.user || !session.user.id) {
            return NextResponse.json(
                { error: 'Unauthorized. Please sign in.' },
                { status: 401 }
            );
        }

        const userId = session.user.id;
        const body = await request.json();
        const { articleId, type } = body;

        if (!articleId || !type) {
            return NextResponse.json(
                { error: 'articleId and type are required' },
                { status: 400 }
            );
        }

        if (!['like', 'read', 'dislike'].includes(type)) {
            return NextResponse.json(
                { error: 'type must be "like", "read", or "dislike"' },
                { status: 400 }
            );
        }

        // Check if article exists
        const article = await prisma.article.findUnique({
            where: { id: articleId },
        });

        if (!article) {
            return NextResponse.json(
                { error: 'Article not found' },
                { status: 404 }
            );
        }

        // Record or Update the interaction
        // If user already interacted, we might want to update it (e.g. read -> like)
        // For simplicity, let's upsert or create new

        // Check if interaction exists
        const existingInteraction = await prisma.userInteraction.findFirst({
            where: {
                userId,
                articleId
            }
        });

        if (existingInteraction) {
            // Update existing
            await prisma.userInteraction.update({
                where: { id: existingInteraction.id },
                data: { interactionType: type }
            });
        } else {
            // Create new
            await prisma.userInteraction.create({
                data: {
                    userId,
                    articleId,
                    interactionType: type,
                },
            });
        }

        // Update total interactions count in preferences
        // Find pref for THIS user
        let preferences = await prisma.userPreferences.findUnique({
            where: { userId }
        });

        if (!preferences) {
            preferences = await prisma.userPreferences.create({
                data: {
                    userId,
                    totalInteractions: 1,
                },
            });
        } else {
            // Update interaction count (approximate, really should query count)
            // Or just increment
            await prisma.userPreferences.update({
                where: { id: preferences.id },
                data: {
                    totalInteractions: { increment: 1 },
                },
            });
        }

        return NextResponse.json({
            success: true,
            totalInteractions: (preferences.totalInteractions || 0) + 1,
        });

    } catch (error) {
        console.error('Error recording interaction:', error);
        return NextResponse.json(
            { error: 'Failed to record interaction' },
            { status: 500 }
        );
    }
}

/**
 * GET - Retrieve user preferences for the LOGGED IN user
 */
export async function GET() {
    try {
        const session = await auth();

        if (!session || !session.user || !session.user.id) {
            return NextResponse.json({
                totalInteractions: 0,
                preferredCategories: {},
                preferredSources: {},
                preferredTopics: [],
                lastAnalyzed: null,
            });
        }

        const userId = session.user.id;

        const preferences = await prisma.userPreferences.findUnique({
            where: { userId }
        });

        // Also fetch direct interactions to fill the "Liked/Disliked" sets on frontend
        const interactions = await prisma.userInteraction.findMany({
            where: { userId },
            select: { articleId: true, interactionType: true }
        });

        const likedIds = interactions.filter(i => i.interactionType === 'like').map(i => i.articleId);
        const dislikedIds = interactions.filter(i => i.interactionType === 'dislike').map(i => i.articleId);

        if (!preferences) {
            return NextResponse.json({
                totalInteractions: 0,
                preferredCategories: {},
                preferredSources: {},
                preferredTopics: [],
                lastAnalyzed: null,
                likedIds,
                dislikedIds
            });
        }

        return NextResponse.json({
            totalInteractions: preferences.totalInteractions,
            preferredCategories: JSON.parse(preferences.preferredCategories),
            preferredSources: JSON.parse(preferences.preferredSources),
            preferredTopics: JSON.parse(preferences.preferredTopics),
            lastAnalyzed: preferences.lastAnalyzedAt,
            likedIds,
            dislikedIds
        });

    } catch (error) {
        console.error('Error fetching preferences:', error);
        return NextResponse.json(
            { error: 'Failed to fetch preferences' },
            { status: 500 }
        );
    }
}
