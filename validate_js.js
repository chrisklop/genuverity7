try {
    const fs = require('fs');
    const content = fs.readFileSync('/Users/klop/GenuVerity7/js/reports-data.js', 'utf8');
    // We can't just eval it because it's a const declaration in a file, not a module export.
    // But we can try to eval it in a safe context or just standard eval since it's local trusted code.
    eval(content);
    console.log("Syntax OK. Total reports:", REPORTS_DATA.length);
    console.log("First report ID:", REPORTS_DATA[0].id);
    console.log("First report Title:", REPORTS_DATA[0].title);
} catch (e) {
    console.error("Syntax Error:", e.message);
}
