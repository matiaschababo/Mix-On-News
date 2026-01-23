import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { scrapeAllSources } from '@/lib/scraper';
import { curateArticles } from '@/lib/curator';

export const dynamic = 'force-dynamic';
export const maxDuration = 60; // Allow up to 60 seconds for scraping

export async function POST() {
    try {
        console.log('🚀 Starting news refresh...');

        // Step 1: Scrape all sources
        const scrapedArticles = await scrapeAllSources();

        if (scrapedArticles.length === 0) {
            return NextResponse.json({
                message: 'No articles found',
                added: 0,
                skipped: 0,
            });
        }

        // Step 2: Filter out duplicates (check against existing URLs in DB)
        const existingUrls = await prisma.article.findMany({
            select: { url: true },
        });

        const existingUrlSet = new Set(existingUrls.map((a: { url: string }) => a.url));
        const newArticles = scrapedArticles.filter(a => !existingUrlSet.has(a.url));

        console.log(`📊 Found ${scrapedArticles.length} articles, ${newArticles.length} are new`);

        if (newArticles.length === 0) {
            return NextResponse.json({
                message: 'No new articles to add',
                added: 0,
                skipped: scrapedArticles.length,
            });
        }

        // Step 3: Run AI curation on new articles only
        const curatedArticles = await curateArticles(newArticles);

        // Step 4: Save to database (using individual creates for SQLite compatibility)
        const savePromises = curatedArticles.map(article =>
            prisma.article.create({
                data: {
                    url: article.url,
                    title: article.title,
                    summary: article.summary,
                    source: article.source,
                    category: article.category,
                    relevance: article.relevance,
                    publishedAt: article.publishedAt,
                },
            }).catch(error => {
                // Handle unique constraint violations (duplicates) silently
                if (error.code === 'P2002') {
                    return null;
                }
                throw error;
            })
        );

        const results = await Promise.all(savePromises);
        const savedCount = results.filter((r: any) => r !== null).length;

        console.log(`✅ Refresh complete: ${savedCount} articles added`);

        // Analyze preferences if we have enough interactions (every 10+ interactions)
        const preferences = await prisma.userPreferences.findFirst();
        const shouldAnalyze = preferences && preferences.totalInteractions >= 5 &&
            (!preferences.lastAnalyzedAt ||
                preferences.totalInteractions - (preferences.lastAnalyzedAt ? 10 : 0) >= 10);

        if (shouldAnalyze) {
            console.log('🧠 Triggering preference analysis...');
            // Import dynamically to avoid circular dependencies
            const { analyzeAndUpdatePreferences } = await import('@/lib/preference-learning');
            await analyzeAndUpdatePreferences();
        }

        return NextResponse.json({
            message: 'Refresh successful',
            added: savedCount,
            skipped: scrapedArticles.length - newArticles.length,
        });

    } catch (error) {
        console.error('Error refreshing news:', error);
        return NextResponse.json(
            { error: 'Failed to refresh news', details: (error as Error).message },
            { status: 500 }
        );
    }
}
