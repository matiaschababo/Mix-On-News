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

/**
 * Scrapes Infobae homepage for latest news
 */
/**
 * Scrapes Infobae homepage for latest news
 */
/**
 * Scrapes Infobae homepage for latest news
 */
async function scrapeInfobae(): Promise<ScrapedArticle[]> {
  try {
    const { data } = await axios.get('https://www.infobae.com/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      },
    });
    const $ = cheerio.load(data);
    const articles: ScrapedArticle[] = [];

    // More generic selector for Infobae
    $('a[href*="/2024/"], a[href*="/2025/"]').slice(0, 30).each((_, elem) => {
      const linkElem = $(elem);
      const url = linkElem.attr('href');

      // Try to find title inside the link or in parent
      let title = linkElem.text().trim();
      if (!title || title.length < 15) {
        title = linkElem.find('h2, h3').text().trim();
      }

      // Category fallback from URL
      let category = '';
      if (url && url.includes('/')) {
        const parts = url.split('/').filter(p => p.length > 0);
        // infobae.com/economia/2024/... -> economia is index 1 (after domain)
        if (parts.length > 1 && !['2024', '2025', 'new-resizer'].includes(parts[1])) {
          category = parts[1];
        }
      }

      if (url && title && title.length > 20 && url.startsWith('http')) {
        // Avoid duplicates
        if (!articles.some(a => a.url === url)) {
          articles.push({
            url,
            title,
            source: 'Infobae',
            category: category ? capitalize(category) : undefined
          });
        }
      }
    });

    return articles.slice(0, 15);
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
      const linkElem = $article.find('a').first();
      const titleElem = $article.find('h2, h3, .headline').first();
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
