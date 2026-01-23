import axios from 'axios';
import * as cheerio from 'cheerio';

export interface ScrapedArticle {
  url: string;
  title: string;
  summary?: string;
  source: string;
  publishedAt?: Date;
}

/**
 * Scrapes Infobae homepage for latest news
 */
async function scrapeInfobae(): Promise<ScrapedArticle[]> {
  try {
    const { data } = await axios.get('https://www.infobae.com/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      },
    });
    const $ = cheerio.load(data);
    const articles: ScrapedArticle[] = [];

    // Infobae uses <article> tags with headlines in <h2> or <h3>
    $('article').slice(0, 20).each((_, elem) => {
      const $article = $(elem);
      const linkElem = $article.find('a').first();
      const titleElem = $article.find('h2, h3').first();

      const url = linkElem.attr('href');
      const title = titleElem.text().trim();

      if (url && title && url.startsWith('http')) {
        articles.push({
          url,
          title,
          source: 'Infobae',
        });
      }
    });

    return articles;
  } catch (error) {
    console.error('Error scraping Infobae:', error);
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

    // Página 12 structure
    $('article').slice(0, 20).each((_, elem) => {
      const $article = $(elem);
      const linkElem = $article.find('a').first();
      const titleElem = $article.find('h2, h3, .article-title').first();

      let url = linkElem.attr('href');
      const title = titleElem.text().trim();

      if (url && title) {
        // Handle relative URLs
        if (!url.startsWith('http')) {
          url = `https://www.pagina12.com.ar${url}`;
        }
        articles.push({
          url,
          title,
          source: 'Página 12',
        });
      }
    });

    return articles;
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

      let url = linkElem.attr('href');
      const title = titleElem.text().trim();

      if (url && title) {
        if (!url.startsWith('http')) {
          url = `https://www.lanacion.com.ar${url}`;
        }
        articles.push({
          url,
          title,
          source: 'La Nación',
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

      let url = linkElem.attr('href');
      const title = titleElem.text().trim();

      if (url && title) {
        if (!url.startsWith('http')) {
          url = `https://www.lacapital.com.ar${url}`;
        }
        articles.push({
          url,
          title,
          source: 'La Capital',
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
      const linkElem = $article.find('a').first();
      const titleElem = $article.find('h2, h3, .headline').first();

      let url = linkElem.attr('href');
      const title = titleElem.text().trim();

      if (url && title) {
        if (!url.startsWith('http')) {
          url = `https://www.rosario3.com${url}`;
        }
        articles.push({
          url,
          title,
          source: 'Rosario 3',
        });
      }
    });

    return articles;
  } catch (error) {
    console.error('Error scraping Rosario 3:', error);
    return [];
  }
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
