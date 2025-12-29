const { GoogleGenerativeAI } = require("@google/generative-ai");
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// Initialize Gemini
// Initialize Gemini
const apiKey = (process.env.GEMINI_API_KEY || "").trim();
console.log("DEBUG: GEMINI_API_KEY loaded? " + (apiKey ? "YES (Len: " + apiKey.length + ")" : "NO"));
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function analyzeTrends(trends) {
    console.log("🧠 Analyzing trends for disinformation signals...");

    // Prepare prompt
    const trendsList = trends.map((t, i) =>
        `${i + 1}. "${t.title}" (${t.traffic} searches)\n   Context: ${t.related.join(', ')}`
    ).join('\n\n');

    const prompt = `
    ROLE: You are an expert Disinformation Analyst for GenuVerity (an anti-misinformation platform).
    
    TASK: Review these diverse trending topics. Identify the top 3-5 that have the HIGHEST POTENTIAL to be related to:
    1. Viral Misinformation or Hoaxes
    2. Political Conspiracy Theories
    3. Pseudoscience / Health Scams
    4. Controversial Misunderstandings
    
    IGNORE: "Normal" news (Sports scores, Celebrity birthdays, generic weather, pure politics without conspiracy).
    
    INPUT TRENDS:
    ${trendsList}
    
    OUTPUT: Return a JSON object with a "candidates" array.
    Each candidate must have:
    - id: (original list index number)
    - title: (the trend topic)
    - risk_level: "HIGH" | "MEDIUM" | "LOW"
    - category: "Health" | "Politics" | "Tech" | "Scam"
    - reason: (1 sentence why this might be disinfo)
    - debunk_angle: (1 sentence on what to verify)
    
    If nothing is suspicious, find the most "memetic" or debatable topic.
    RETURN RAW JSON ONLY. NO MARKDOWN.
    `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text();

        // Clean markdown
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();

        const data = JSON.parse(text);
        return data.candidates;

    } catch (error) {
        console.error("❌ Analysis Failed:", error);
        return [];
    }
}

module.exports = { analyzeTrends };
