import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { scrapeAllSources } from '@/lib/scraper';
import { curateArticles } from '@/lib/curator';

export const dynamic = 'force-dynamic';

/**
 * Vercel Cron Job endpoint
 * This runs automatically every 6 hours to scrape fresh news
 * 
 * Schedule configured in vercel.json
 */
export async function GET(request: Request) {
    try {
        // Verify the request is from Vercel Cron
        const authHeader = request.headers.get('authorization');

        if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        console.log('🕐 [CRON] Starting automated news refresh...');

        // Step 1: Scrape all news sources
        const scrapedArticles = await scrapeAllSources();
        console.log(`📊 [CRON] Scraped ${scrapedArticles.length} articles`);

        // Step 2: Filter out duplicates (check if URL already exists)
        const existingArticles = await prisma.article.findMany({
            select: { url: true },
        });

        const existingUrls = new Set(existingArticles.map((a: { url: string }) => a.url));
        const newArticles = scrapedArticles.filter(a => !existingUrls.has(a.url));

        console.log(`🆕 [CRON] Found ${newArticles.length} new articles`);

        if (newArticles.length === 0) {
            return NextResponse.json({
                message: 'No new articles found',
                scraped: scrapedArticles.length,
                added: 0,
            });
        }

        // Step 3: Run AI curation on new articles only
        const curatedArticles = await curateArticles(newArticles);

        // Step 4: Save to database
        const savePromises = curatedArticles.map(article =>
            prisma.article.create({
                data: {
                    url: article.url,
                    title: article.title,
                    source: article.source,
                    category: article.category,
                    relevance: article.relevance,
                    scrapedAt: new Date(),
                },
            })
        );

        await Promise.all(savePromises);
        const savedCount = savePromises.length;

        console.log(`✅ [CRON] Saved ${savedCount} new articles`);

        // Analyze preferences if needed
        const preferences = await prisma.userPreferences.findFirst();
        if (preferences && preferences.totalInteractions >= 5) {
            const shouldAnalyze = !preferences.lastAnalyzedAt ||
                preferences.totalInteractions - 10 >= (preferences.lastAnalyzedAt ? 10 : 0);

            if (shouldAnalyze) {
                console.log('🧠 [CRON] Triggering preference analysis...');
                const { analyzeAndUpdatePreferences } = await import('@/lib/preference-learning');
                await analyzeAndUpdatePreferences();
            }
        }

        return NextResponse.json({
            message: 'Cron job completed successfully',
            scraped: scrapedArticles.length,
            added: savedCount,
            timestamp: new Date().toISOString(),
        });

    } catch (error) {
        console.error('❌ [CRON] Error:', error);
        return NextResponse.json(
            { error: 'Cron job failed', details: (error as Error).message },
            { status: 500 }
        );
    }
}
