import axios from 'axios';
import * as cheerio from 'cheerio';

export interface ScrapedArticle {
  url: string;
  title: string;
  summary?: string;
  source: string;
  category?: string; // Original category from source
  publishedAt?: Date;
}

import Parser from 'rss-parser';

const parser = new Parser();

/**
 * Scrapes Infobae homepage using RSS Feed for reliability
 */
async function scrapeInfobae(): Promise<ScrapedArticle[]> {
  try {
    const feedUrl = 'https://www.infobae.com/arc/outboundfeeds/rss/?outputType=xml';
    const feed = await parser.parseURL(feedUrl);
    const articles: ScrapedArticle[] = [];

    feed.items.slice(0, 20).forEach((item) => {
      const url = item.link;
      const title = item.title;

      // Attempt to extract category from URL
      // https://www.infobae.com/economia/2024/... -> economia
      let category = '';
      if (url && url.includes('infobae.com/')) {
        const parts = url.split('infobae.com/')[1].split('/');
        if (parts.length > 0 && !['2024', '2025', 'new-resizer'].includes(parts[0])) {
          category = parts[0];
        }
      }

      if (url && title && url.startsWith('http')) {
        articles.push({
          url,
          title: title.trim(),
          source: 'Infobae',
          category: category ? capitalize(category) : undefined,
          publishedAt: item.pubDate ? new Date(item.pubDate) : undefined,
          summary: item.contentSnippet
        });
      }
    });

    return articles.slice(0, 15);
  } catch (error) {
    console.error('Error scraping Infobae RSS:', error);
    return [];
  }
}

/**
 * Scrapes Página 12 homepage
 */
async function scrapePagina12(): Promise<ScrapedArticle[]> {
  try {
    const { data } = await axios.get('https://www.pagina12.com.ar/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      },
    });
    const $ = cheerio.load(data);
    const articles: ScrapedArticle[] = [];

    // Pagina 12 generic selector
    $('.article-box, article').slice(0, 25).each((_, elem) => {
      const $article = $(elem);
      const linkElem = $article.find('a').first();
      const titleElem = $article.find('h2, h3, .title').first();

      let url = linkElem.attr('href');
      let title = titleElem.text().trim();

      // Fallback title
      if (!title) title = linkElem.text().trim();

      if (url && title && title.length > 15) {
        if (!url.startsWith('http')) {
          url = `https://www.pagina12.com.ar${url}`;
        }

        let category = '';
        if (url.includes('/secciones/')) {
          const match = url.match(/\/secciones\/([^/]+)/);
          if (match) category = match[1].replace(/-/g, ' ');
        } else if (url.includes('/suplementos/')) {
          const match = url.match(/\/suplementos\/([^/]+)/);
          if (match) category = match[1].replace(/-/g, ' ');
        }

        if (!articles.some(a => a.url === url)) {
          articles.push({
            url,
            title,
            source: 'Página 12',
            category: category ? capitalize(category) : undefined
          });
        }
      }
    });

    return articles.slice(0, 15);
  } catch (error) {
    console.error('Error scraping Página 12:', error);
    return [];
  }
}

/**
 * Scrapes La Nación homepage
 */
async function scrapeLaNacion(): Promise<ScrapedArticle[]> {
  try {
    const { data } = await axios.get('https://www.lanacion.com.ar/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      },
    });
    const $ = cheerio.load(data);
    const articles: ScrapedArticle[] = [];

    // La Nación structure
    $('article, .mod-article').slice(0, 20).each((_, elem) => {
      const $article = $(elem);
      const linkElem = $article.find('a').first();
      const titleElem = $article.find('h2, h3, h4').first();
      const categoryElem = $article.find('.com-category, .category').first();

      let url = linkElem.attr('href');
      const title = titleElem.text().trim();
      let category = categoryElem.text().trim();

      if (url && title) {
        if (!url.startsWith('http')) {
          url = `https://www.lanacion.com.ar${url}`;
        }

        if (!category) {
          const match = url.match(/lanacion\.com\.ar\/([^/]+)\//);
          if (match) category = match[1].replace(/-/g, ' ');
        }

        articles.push({
          url,
          title,
          source: 'La Nación',
          category: category ? capitalize(category) : undefined
        });
      }
    });

    return articles;
  } catch (error) {
    console.error('Error scraping La Nación:', error);
    return [];
  }
}

/**
 * Scrapes La Capital (Rosario)
 */
async function scrapeLaCapital(): Promise<ScrapedArticle[]> {
  try {
    const { data } = await axios.get('https://www.lacapital.com.ar/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      },
    });
    const $ = cheerio.load(data);
    const articles: ScrapedArticle[] = [];

    $('article, .nota').slice(0, 20).each((_, elem) => {
      const $article = $(elem);
      const linkElem = $article.find('a').first();
      const titleElem = $article.find('h2, h3, .title').first();
      const categoryElem = $article.find('.badge, .section').first();

      let url = linkElem.attr('href');
      const title = titleElem.text().trim();
      let category = categoryElem.text().trim();

      if (url && title) {
        if (!url.startsWith('http')) {
          url = `https://www.lacapital.com.ar${url}`;
        }

        if (!category) {
          const match = url.match(/lacapital\.com\.ar\/([^/]+)\//);
          if (match && !['informacion-general', 'suscriptores'].includes(match[1])) {
            category = match[1].replace(/-/g, ' ');
          }
        }

        articles.push({
          url,
          title,
          source: 'La Capital',
          category: category ? capitalize(category) : undefined
        });
      }
    });

    return articles;
  } catch (error) {
    console.error('Error scraping La Capital:', error);
    return [];
  }
}

/**
 * Scrapes Rosario 3
 */
async function scrapeRosario3(): Promise<ScrapedArticle[]> {
  try {
    const { data } = await axios.get('https://www.rosario3.com/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      },
    });
    const $ = cheerio.load(data);
    const articles: ScrapedArticle[] = [];

    $('article, .article').slice(0, 20).each((_, elem) => {
      const $article = $(elem);
      // Try to find the specific cover link first, or fallback to any link with a valid href
      const linkElem = $article.find('a.cover-link').first().length
        ? $article.find('a.cover-link').first()
        : $article.find('a[href^="/"]').first();

      const titleElem = $article.find('h2, h3, .headline, .title').first();
      const categoryElem = $article.find('.volanta, .section').first();

      let url = linkElem.attr('href');
      const title = titleElem.text().trim();
      let category = categoryElem.text().trim();

      if (url && title) {
        if (!url.startsWith('http')) {
          url = `https://www.rosario3.com${url}`;
        }

        if (!category) {
          const match = url.match(/rosario3\.com\/([^/]+)\//);
          if (match) category = match[1].replace(/-/g, ' ');
        }

        articles.push({
          url,
          title,
          source: 'Rosario 3',
          category: category ? capitalize(category) : undefined
        });
      }
    });

    return articles;
  } catch (error) {
    console.error('Error scraping Rosario 3:', error);
    return [];
  }
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Main function to scrape all news sources AND Twitter in parallel
 */
export async function scrapeAllSources(): Promise<ScrapedArticle[]> {
  console.log('🔍 Starting to scrape all sources...');

  // Import Twitter scraper dynamically to avoid errors if it fails
  let twitterScraperPromise: Promise<ScrapedArticle[]>;
  try {
    const { scrapeTwitterSources } = await import('./twitter-scraper');
    twitterScraperPromise = scrapeTwitterSources();
  } catch (error) {
    console.warn('⚠️  Twitter scraper not available:', (error as Error).message);
    twitterScraperPromise = Promise.resolve([]);
  }

  const results = await Promise.all([
    scrapeInfobae(),
    scrapePagina12(),
    scrapeLaNacion(),
    scrapeLaCapital(),
    scrapeRosario3(),
    twitterScraperPromise,
  ]);

  const allArticles = results.flat();
  console.log(`✅ Scraped ${allArticles.length} articles from all sources (including Twitter)`);

  return allArticles;
}
