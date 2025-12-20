# GenuVerity Report Inventory

> List of all published reports. Check before generating new content to avoid duplication.

---

## Published Reports

| File | Title | Category | Type | Date |
|------|-------|----------|------|------|
| `fednow-freeze.html` | Is "FedNow Phase 2" Freezing Accounts? | Misinformation / Financial | Fact-Check + Live Data | Dec 17, 2025 |
| `marijuana-rescheduling.html` | Marijuana Rescheduling: Schedule I to III | Drug Policy / Executive Action | Policy Analysis | Dec 18, 2025 |
| `plaque-fact-check.html` | Biden Plaque Fact Check | Politics | Fact-Check | Dec 2025 |
| `inflation-methodology.html` | Inflation Methodology Analysis | Economics | Analysis | Dec 2025 |
| `treasury-leverage.html` | Treasury Leverage Analysis | Finance / Geopolitics | Financial Analysis | Dec 2025 |
| `network-analysis.html` | Network Analysis | Disinformation | Network/Graph Analysis | Dec 2025 |
| `doppelganger-analysis.html` | Doppelganger Campaign Analysis | Disinformation / Russia | Investigation | Dec 2025 |
| `good-morning-chris.html` | Good Morning Chris | Demo / Test | Demo | Dec 2025 |
| `cdc-vaccine-autism.html` | CDC Website Changes: Vaccine-Autism Claims | Public Health / Vaccines | Fact-Check + Analysis | Dec 19, 2025 |
| `tiktok-sale-analysis.html` | TikTok US Sale: What the Deal Contains | Tech Policy / Security | Policy Analysis | Dec 19, 2025 |
| `mangione-trial-analysis.html` | Luigi Mangione Trial: Evidence Analysis | Criminal Justice / Legal | Legal Analysis | Dec 19, 2025 |
| `trump-speech-factcheck.html` | Trump's Dec 17 Speech Fact Check | Politics / Presidential | Fact-Check | Dec 19, 2025 |
| `boat-strike-investigation.html` | Gaza Boat Strikes Investigation | Military / Human Rights | Investigation | Dec 19, 2025 |

---

## Topics Covered (for deduplication)

### Financial / Economic
- ✅ FedNow / CBDC conspiracy claims
- ✅ Cash ban rumors
- ✅ Federal Reserve policy
- ✅ Inflation measurement methodology
- ✅ Treasury foreign holdings / leverage

### Drug Policy
- ✅ Marijuana rescheduling (Schedule I → III)
- ✅ Executive order impact on cannabis industry

### Disinformation Campaigns
- ✅ Russian Doppelganger operation
- ✅ Influence network analysis patterns

### Politics
- ✅ Biden administration fact-checks
- ✅ Executive action analysis
- ✅ Trump speech fact-checks (Dec 17, 2025)

### Public Health / Vaccines
- ✅ CDC website changes re: vaccines and autism
- ✅ Vaccine-autism claims debunked

### Tech Policy / Social Media
- ✅ TikTok US sale / ByteDance deal structure
- ✅ National security concerns re: Chinese apps

### Criminal Justice / Legal
- ✅ Luigi Mangione trial coverage
- ✅ UnitedHealthcare CEO murder case analysis

### Military / International
- ✅ Gaza boat strikes investigation
- ✅ IDF "double-tap" strike patterns
- ✅ International humanitarian law questions

---

## Topics NOT Yet Covered (Potential Targets)

### High Priority Gaps
- [ ] AI-related claims (deepfakes, job loss predictions)
- [ ] Climate/environmental claims
- [ ] Election-related claims (2024/2025)
- [ ] Crypto/Bitcoin claims
- [ ] Immigration statistics
- [ ] Crime statistics claims

### Category Gaps
- [ ] Science/research claims
- [ ] Celebrity/entertainment fact-checks
- [ ] Sports-related claims
- [ ] Consumer protection (scams, products)

---

## Template Reference

| Report Type | Template File | Key Features |
|-------------|---------------|--------------|
| Fact-Check + Live Data | `fednow-freeze.html` | FRED charts, electric borders, claim vs reality |
| Policy Analysis | `marijuana-rescheduling.html` | Timeline, comparison tables, stat cards |
| Financial Analysis | `treasury-leverage.html` | Mermaid diagrams, data cards |
| Network Analysis | `network-analysis.html` | D3.js force graphs |
| Standard Fact-Check | `plaque-fact-check.html` | Basic verdict layout |

---

## Adding New Reports

When adding a new report:

1. Create file: `[topic-slug].html`
2. Follow template from `docs/template.md`
3. Update this inventory
4. Add tile to `reports.html`
5. Deploy: `vercel --prod`

---

*Last updated: December 19, 2025*
