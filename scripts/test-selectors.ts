import Parser from 'rss-parser';

const parser = new Parser({
    headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    }
});

async function testFeeds() {
    console.log('📡 Testing Infobae RSS...');
    try {
        const feed = await parser.parseURL('https://www.infobae.com/feeds/rss/');
        console.log(`   ✅ Found ${feed.items.length} items.`);
        if (feed.items.length > 0) {
            console.log(`   Example: ${feed.items[0].title}`);
            console.log(`   Link: ${feed.items[0].link}`);
        }
    } catch (e: any) {
        console.error('   ❌ Failed Infobae:', e.message);
    }

    console.log('\n📡 Testing Pagina 12 RSS...');
    try {
        const feed = await parser.parseURL('https://www.pagina12.com.ar/rss/portada.xml');
        console.log(`   ✅ Found ${feed.items.length} items.`);
        if (feed.items.length > 0) {
            console.log(`   Example: ${feed.items[0].title}`);
            console.log(`   Link: ${feed.items[0].link}`);
        }
    } catch (e: any) {
        console.error('   ❌ Failed Pagina 12:', e.message);
    }
}

testFeeds();
