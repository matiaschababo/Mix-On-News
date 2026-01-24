
import axios from 'axios';
import * as cheerio from 'cheerio';
import Parser from 'rss-parser';

const parser = new Parser();

async function debugInfobae() {
    console.log('🕵️‍♀️ INICIANDO DIAGNÓSTICO PROFUNDO DE INFOBAE\n');

    const headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'es-419,es;q=0.9,en;q=0.8',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
    };

    // TEST 1: RSS Internal Feed
    console.log('--- TEST 1: RSS Feed (arc/outboundfeeds) ---');
    try {
        const feedUrl = 'https://www.infobae.com/arc/outboundfeeds/rss/?outputType=xml';
        console.log(`Fetching: ${feedUrl}`);
        const response = await axios.get(feedUrl, { headers, timeout: 5000 });
        console.log(`Status: ${response.status}`);
        console.log(`Content-Type: ${response.headers['content-type']}`);
        if (response.data.includes('<rss') || response.data.includes('<feed')) {
            console.log('✅ RSS valid found');
            const feed = await parser.parseString(response.data);
            console.log(`Items found: ${feed.items.length}`);
            if (feed.items.length > 0) console.log(`Sample: ${feed.items[0].title}`);
        } else {
            console.log('⚠️ RSS request worked but content does not look like RSS');
            console.log('Preview:', response.data.substring(0, 200));
        }
    } catch (e: any) {
        console.error(`❌ RSS Failed: ${e.message}`);
        if (e.response) console.error(`   Status: ${e.response.status}`);
    }

    // TEST 2: Homepage HTML Scraping
    console.log('\n--- TEST 2: Homepage HTML Scraping ---');
    try {
        console.log('Fetching homepage: https://www.infobae.com/?noredirect=1');
        const { data } = await axios.get('https://www.infobae.com/?noredirect=1', { headers, timeout: 5000 });
        const $ = cheerio.load(data);

        const title = $('title').text();
        console.log(`Page Title: ${title}`);

        // Check for specific Infobae article selectors
        const h2Links = $('h2 a').length;
        const h3Links = $('a h2').length; // Sometimes inverted
        const cardLinks = $('.cst_card_link, a.dne_link, a.deck_link').length;

        console.log(`Found 'h2 a' elements: ${h2Links}`);
        console.log(`Found 'a h2' elements: ${h3Links}`);
        console.log(`Found card specific classes: ${cardLinks}`);

        // Try extracting JSON Hydration Data (Fusion)
        console.log('\n--- TEST 3: JSON Hydration Data ---');
        const scriptTags = $('script').map((i, el) => $(el).html()).get();
        const fusionScript = scriptTags.find(s => s && s.includes('Fusion.globalContent'));

        if (fusionScript) {
            console.log('✅ Found "Fusion.globalContent" script! This is the gold mine.');
            const match = fusionScript.match(/Fusion\.globalContent\s*=\s*({.+?});/);
            if (match) {
                console.log('   JSON extracted successfully.');
                const json = JSON.parse(match[1]);
                console.log('   Has content elements?', !!json.content_elements);
            }
        } else {
            console.log('❌ "Fusion.globalContent" script NOT found.');
        }

    } catch (e: any) {
        console.error(`❌ HTML Scraping Failed: ${e.message}`);
    }
}

debugInfobae();
