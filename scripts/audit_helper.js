
// Extract just the data array
const reports = REPORTS_DATA;

// Helper to parse "Dec 25, 2025" etc
function parseDate(dateStr) {
    return new Date(dateStr);
}

// Sort oldest to newest
reports.sort((a, b) => parseDate(a.date) - parseDate(b.date));

// Output list
console.log(JSON.stringify(reports.map(r => ({
    id: r.id,
    title: r.title,
    date: r.date,
    slug: r.slug,
    sourceParams: r.sources
})), null, 2));

console.log(`\nTotal Reports: ${reports.length}`);
