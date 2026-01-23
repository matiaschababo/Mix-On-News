import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const articles = await prisma.article.findMany({
            orderBy: [
                { relevance: 'desc' },
                { scrapedAt: 'desc' },
            ],
            take: 100, // Limit to most recent 100 articles
        });

        // Group by category for easier frontend handling
        const categories = Array.from(new Set(articles.map((a: { category: string }) => a.category)));

        return NextResponse.json({
            articles,
            categories,
            total: articles.length,
            lastUpdated: articles[0]?.scrapedAt || null,
        });
    } catch (error) {
        console.error('Error fetching articles:', error);
        return NextResponse.json(
            { error: 'Failed to fetch articles' },
            { status: 500 }
        );
    }
}
