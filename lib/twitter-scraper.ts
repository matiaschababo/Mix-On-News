import * as cheerio from 'cheerio';
import { ScrapedArticle } from './scraper';

// Lista de instancias de Nitter con fallback
const NITTER_INSTANCES = [
    'https://nitter.poast.org',
    'https://nitter.privacydev.net',
    'https://nitter.net',
];

// Perfiles de streamers a scrapear
const TWITTER_PROFILES = [
    'majuloficial',
    'luigioficial',
    'FEDE_STORANI',
];

interface NitterTweet {
    text: string;
    url: string;
    date: Date;
    username: string;
}

/**
 * Intenta scrapear un perfil usando diferentes instancias de Nitter
 */
async function scrapeProfileWithFallback(username: string): Promise<NitterTweet[]> {
    for (const instance of NITTER_INSTANCES) {
        try {
            console.log(`🐦 Trying to scrape @${username} from ${instance}...`);
            const tweets = await scrapeNitterInstance(instance, username);

            if (tweets.length > 0) {
                console.log(`✅ Successfully scraped ${tweets.length} tweets from @${username}`);
                return tweets;
            }
        } catch (error) {
            console.warn(`⚠️  Failed to scrape from ${instance}:`, (error as Error).message);
            // Continuar con la siguiente instancia
        }
    }

    console.error(`❌ All Nitter instances failed for @${username}`);
    return [];
}

/**
 * Scrapea tweets de un perfil usando una instancia específica de Nitter
 */
async function scrapeNitterInstance(
    instance: string,
    username: string
): Promise<NitterTweet[]> {
    const url = `${instance}/${username}`;

    const response = await fetch(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        },
        signal: AbortSignal.timeout(10000), // 10 second timeout
    });

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    const tweets: NitterTweet[] = [];

    // Nitter usa la clase .timeline-item para cada tweet
    $('.timeline-item').each((i, element) => {
        if (i >= 5) return false; // Limitar a 5 tweets por perfil

        const $tweet = $(element);

        // Extraer texto del tweet
        const $content = $tweet.find('.tweet-content');
        const text = $content.text().trim();

        if (!text || text.length < 10) return; // Skip tweets muy cortos o vacíos

        // Extraer link del tweet
        const tweetLink = $tweet.find('.tweet-link').attr('href');
        if (!tweetLink) return;

        // Convertir link de Nitter a Twitter real
        const tweetUrl = `https://twitter.com${tweetLink}`;

        // Extraer fecha
        const $date = $tweet.find('.tweet-date a');
        const dateStr = $date.attr('title') || '';
        const date = dateStr ? new Date(dateStr) : new Date();

        tweets.push({
            text,
            url: tweetUrl,
            date,
            username,
        });
    });

    return tweets;
}

/**
 * Scrapea tweets de todos los perfiles configurados
 */
export async function scrapeTwitterSources(): Promise<ScrapedArticle[]> {
    console.log('🐦 Starting Twitter scraping...');

    const allTweets: NitterTweet[] = [];

    // Scrapear perfiles en serie para evitar rate limits
    for (const username of TWITTER_PROFILES) {
        const tweets = await scrapeProfileWithFallback(username);
        allTweets.push(...tweets);

        // Delay entre perfiles para ser respetuosos con Nitter
        if (TWITTER_PROFILES.indexOf(username) < TWITTER_PROFILES.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    }

    // Convertir tweets a formato ScrapedArticle
    const articles: ScrapedArticle[] = allTweets.map(tweet => ({
        url: tweet.url,
        title: `@${tweet.username}: ${tweet.text.substring(0, 80)}${tweet.text.length > 80 ? '...' : ''}`,
        summary: tweet.text,
        source: `Twitter - @${tweet.username}`,
        publishedAt: tweet.date,
    }));

    console.log(`✅ Twitter scraping complete: ${articles.length} tweets collected`);

    return articles;
}
