const { GoogleGenerativeAI } = require("@google/generative-ai");
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

async function testKey() {
    console.log("--- API KEY DEBUG ---");
    const key = process.env.GEMINI_API_KEY;

    if (!key) {
        console.error("❌ Key is undefined/empty");
        return;
    }

    console.log(`Key Found: ${key.substring(0, 8)}... (Length: ${key.length})`);

    // Check for weird invisible chars
    if (key.trim() !== key) {
        console.warn("⚠️  Key has leading/trailing whitespace!");
    }

    const genAI = new GoogleGenerativeAI(key.trim());
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    try {
        console.log("Attempting generation...");
        const result = await model.generateContent("Hello, are you working?");
        const response = await result.response;
        console.log("✅ Success! Response: " + response.text());
    } catch (e) {
        console.error("❌ Generation Failed:", e.message);
        if (e.message.includes("API_KEY_INVALID")) {
            console.error("   -> The key itself is rejected by Google.");
        }
    }
}

testKey();
