async function test() {
    try {
        const RSS_URL = 'https://trends.google.com/trends/trendingsearches/daily/rss?geo=US';
        console.log("Fetching: " + RSS_URL);
        const response = await fetch(RSS_URL, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });
        const text = await response.text();
        console.log("Response Status:", response.status);
        console.log("Response Length:", text.length);
        console.log("Preview:", text.substring(0, 500));

        const itemRegex = /<item>([\s\S]*?)<\/item>/g;
        let match = itemRegex.exec(text);
        console.log("Regex Match Found:", !!match);
    } catch (e) {
        console.error("Error:", e);
    }
}
test();
