
import axios from 'axios';
import * as cheerio from 'cheerio';

async function testSelectors() {
    console.log('🧪 Testing Infobae selectors...');
    try {
        const { data } = await axios.get('https://www.infobae.com/', {
            headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36' }
        });
        const $ = cheerio.load(data);
        const links = $('a[href*="/2025/"], a[href*="/2024/"]').length; // Infobae urls usually contain date
        const articles = $('article').length;
        console.log(`   Found ${articles} articles and ${links} potentially relevant links.`);

        $('article').slice(0, 3).each((i, el) => {
            const title = $(el).find('h2, h3').text().trim();
            const link = $(el).find('a').attr('href');
            console.log(`   [${i}] ${title} -> ${link}`);
        });

    } catch (e: any) {
        console.error('   Failed:', e.message);
    }

    console.log('\n🧪 Testing Pagina 12 selectors...');
    try {
        const { data } = await axios.get('https://www.pagina12.com.ar/', {
            headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36' }
        });
        const $ = cheerio.load(data);
        const articles = $('article').length;
        console.log(`   Found ${articles} articles.`);

        $('article').slice(0, 3).each((i, el) => {
            const title = $(el).find('h2, h3, .title, .article-title').text().trim();
            const link = $(el).find('a').attr('href');
            console.log(`   [${i}] ${title} -> ${link}`);
        });

    } catch (e: any) {
        console.error('   Failed:', e.message);
    }
}

testSelectors();
