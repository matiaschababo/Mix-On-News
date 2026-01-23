import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

/**
 * POST - Record a user interaction (like, read, dislike)
 */
export async function POST(request: Request) {
    try {
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

        // Record the interaction
        const interaction = await prisma.userInteraction.create({
            data: {
                articleId,
                interactionType: type,
            },
        });

        // Update total interactions count in preferences
        let preferences = await prisma.userPreferences.findFirst();

        if (!preferences) {
            // Create preferences entry if doesn't exist
            preferences = await prisma.userPreferences.create({
                data: {
                    totalInteractions: 1,
                },
            });
        } else {
            // Update interaction count
            await prisma.userPreferences.update({
                where: { id: preferences.id },
                data: {
                    totalInteractions: preferences.totalInteractions + 1,
                },
            });
        }

        console.log(`✅ Recorded ${type} interaction for article ${articleId}`);

        return NextResponse.json({
            success: true,
            interaction,
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
 * GET - Retrieve user preferences and interaction stats
 */
export async function GET() {
    try {
        const preferences = await prisma.userPreferences.findFirst();

        if (!preferences) {
            return NextResponse.json({
                totalInteractions: 0,
                preferredCategories: {},
                preferredSources: {},
                preferredTopics: [],
                lastAnalyzed: null,
            });
        }

        return NextResponse.json({
            totalInteractions: preferences.totalInteractions,
            preferredCategories: JSON.parse(preferences.preferredCategories),
            preferredSources: JSON.parse(preferences.preferredSources),
            preferredTopics: JSON.parse(preferences.preferredTopics),
            lastAnalyzed: preferences.lastAnalyzedAt,
        });

    } catch (error) {
        console.error('Error fetching preferences:', error);
        return NextResponse.json(
            { error: 'Failed to fetch preferences' },
            { status: 500 }
        );
    }
}
