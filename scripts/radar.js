const readline = require('readline');
const { getUSDailyTrends } = require('./utils/google-trends');
const { analyzeTrends } = require('./analyze-trends');

// ASCII Art
const BANNER = `
   ______                      _    __           _ __
  / ____/___  ____  __  ____  | |  / /___  _____(_) /___  __
 / / __/ _ \\/ __ \\/ / / / / / / | / / _ \\/ ___/ / __/ / / /
/ /_/ /  __/ / / / /_/ / /_/ /| |/ /  __/ /  / / /_/ /_/ / 
\\____/\\___/_/ /_/\\__,_/\\____/ |___/\\___/_/  /_/\\__/\\__, /  
                                                  /____/   
   📡 THE RADAR v1.0 | Discovery Engine
`;

async function main() {
    console.clear();
    console.log(BANNER);

    // 1. Scan
    const trends = await getUSDailyTrends();
    if (trends.length === 0) {
        console.log("❌ No trends found. Aborting.");
        process.exit(1);
    }
    console.log(`✅ Scanned ${trends.length} raw trends from Google (US).`);

    // 2. Filter
    const candidates = await analyzeTrends(trends);

    if (candidates.length === 0) {
        console.log("🤔 No high-risk disinformation found in current trends.");
        console.log("   Displaying top raw trends instead...");
        // TODO: Fallback logic
        process.exit(0);
    }

    // 3. Present Menu
    console.log("\n🎯 TARGET SELECTION MENU");
    console.log("--------------------------------------------------");

    candidates.forEach((c, index) => {
        const riskIcon = c.risk_level === 'HIGH' ? '🔴' : (c.risk_level === 'MEDIUM' ? '🟠' : '🔵');
        console.log(`${index + 1}. ${riskIcon} [${c.category}] ${c.title}`);
        console.log(`   📝 Angel: ${c.debunk_angle}`);
        console.log(`   🔍 Context: ${c.reason}`);
        console.log("--------------------------------------------------");
    });

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('\nSelect a target number to initiate Research Protocol (or q to quit): ', (answer) => {
        if (answer.toLowerCase() === 'q') {
            console.log("👋 Radar shutdown.");
            rl.close();
        } else {
            const idx = parseInt(answer) - 1;
            if (candidates[idx]) {
                const target = candidates[idx];
                console.log("\n🚀 INITIATING DEEP RESEARCH PROTOCOL...");
                console.log(`   TARGET: "${target.title}"`);
                console.log(`   TYPE: ${target.category}`);

                console.log("\n📋 COPY THIS PROMPT FOR THE BROWSER AGENT:");
                console.log("==================================================");
                console.log(`RESEARCH REPORT: "${target.title}"`);
                console.log(`Investigation Angle: ${target.debunk_angle}`);
                console.log("Please conduct a deep dive into this viral trend. Find primary sources, verify claims, and identify the origin.");
                console.log("==================================================");

                // Future: Auto-trigger server.py /api/generate
            }
            rl.close();
        }
    });
}

if (require.main === module) {
    main();
}
