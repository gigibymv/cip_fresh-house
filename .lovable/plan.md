

## UI Due Diligence Audit — Full Application Review

### Executive Summary

After reviewing all 20+ pages across both portals, I found **23 issues** across information hierarchy, data presentation, navigation, and consistency. Below is the prioritized list with proposed fixes.

---

### Critical: Information Hierarchy Problems

**1. Renewal date buried in paragraph text (Renewal Readiness)**
The renewal date "September 2026" is hidden inside a long PageHeader description string. This is the single most important piece of context on this page.
- **Fix**: Extract renewal date into a prominent KPI card or a callout banner at the top, alongside the readiness score. Add a countdown (e.g., "5 months remaining").

**2. PageHeader descriptions overloaded with data**
Several pages stuff critical information into the `description` prop, creating walls of text that users skip:
- `RenewalReadiness`: renewal date + scoring threshold explanation + readiness definition
- `BeneficiaryVoice`: survey response count (461) buried in description
- `InvestorOutcomes`: confidence label explanation in description
- **Fix**: Move actionable data (dates, counts, thresholds) into dedicated UI elements (badges, KPI cards, callout boxes). Keep descriptions to one sentence of context.

**3. InvestorOverview duplicates content from sub-pages**
The dashboard includes a benchmark comparison chart AND an outcomes trend chart that are nearly identical to what appears on the dedicated Outcomes and Benchmarks pages. This creates confusion about which is the "source of truth."
- **Fix**: Keep the dashboard versions as compact summaries (sparklines or single-number callouts) with "View details" links, rather than full duplicate charts.

---

### High: Data Display Issues

**4. Inconsistent KPI card sizing and density**
- `InvestorOverview`: Uses `KpiCard` component (170px min-height, with descriptions)
- `CapitalOverview`: Uses `KpiCard` but without descriptions
- `RenewalReadiness`: Uses raw Card with manual layout (different padding, no arrow icon)
- `ScenarioPlanning`: Uses raw Card with centered layout and icons
- `BeneficiaryVoice`: Uses raw Card with centered icons and suffixes
- **Fix**: Standardize on `KpiCard` for all top-level metrics. Add icon support to `KpiCard` to cover ScenarioPlanning's needs.

**5. Health Impact Metrics section lacks confidence badges**
The new health impact sections on both dashboards show values like "-18%" and "$1,240" with no source attribution. Per the project's own design principle, every metric must include a confidence label.
- **Fix**: Add `ConfidenceBadge` to each health impact metric card.

**6. Evidence Quality shows "Strong" as a text value**
On Renewal Readiness, "Strong" is displayed as a `text-3xl font-semibold` value — but it's a qualitative judgment presented like a quantitative metric. This is misleading.
- **Fix**: Replace with the actual fraction "4/5" as the primary value, with "Strong" as a subtitle/badge.

**7. ScoreBar used inconsistently**
`ScoreBar` appears in CurrentFunders and RenewalScoring but not in RenewalReadiness's KPI cards (which show the same type of score). The Renewal Readiness "82%" has a ScoreBar but "Evidence Quality" does not.
- **Fix**: Use ScoreBar consistently wherever a 0-100 metric is displayed.

---

### Medium: Navigation & Structure Issues

**8. Investor sidebar missing pages that exist in routes**
Routes include `/investor/programs`, `/investor/benchmarks`, and `/investor/scenario-planning`, but the sidebar (`investorItems`) only has 6 items and omits Programs, Benchmarks, and Scenario Planning. These pages are orphaned — unreachable except via direct URL.
- **Fix**: Either add these to the sidebar navigation or consolidate their content into existing pages.

**9. Internal sidebar missing Capital Recommendations and Materials**
Routes exist for `/internal/capital-recommendations` and `/internal/materials`, but neither appears in the sidebar navigation. These are also orphaned pages.
- **Fix**: Add to sidebar or merge content into existing pages.

**10. No breadcrumbs or "you are here" context**
When navigating into a funder detail view (CurrentFunders), the user sees a "Back to funders" ghost button but has no persistent breadcrumb trail. On the investor side, there's no way to understand page hierarchy.
- **Fix**: Add breadcrumb component to AppLayout or PageHeader.

---

### Medium: Consistency Issues

**11. Mixed heading patterns**
- Some pages use `PageHeader` for the title (most pages)
- `InvestorOverview` uses a custom `h1` + `p` instead of PageHeader
- `CapitalOverview` uses PageHeader but wraps it in a flex container with a fiscal badge, breaking the standard spacing
- **Fix**: Use PageHeader everywhere with a slot for auxiliary badges (like the fiscal period indicator).

**12. Section headers within pages inconsistent**
- `InvestorOverview`: `h2` with `text-lg font-bold` for sections
- `CapitalOverview`: `CardTitle` with `text-lg font-bold` inside Card headers
- `DataRoom`: `h2` with `text-sm font-semibold uppercase tracking-wider`
- **Fix**: Standardize on one pattern for in-page section headers.

**13. Card border-radius inconsistency**
The design system uses `rounded-2xl` as the global radius, but some cards use default shadcn Card (which is `rounded-xl`), while custom cards in health metrics explicitly set `rounded-2xl`.
- **Fix**: Ensure Card component default matches the `rounded-2xl` design token.

**14. Table vs Card list inconsistency**
- `RenewalScoring`: Uses proper `Table` component
- `CapitalOverview`: Uses a raw `<table>` element
- `CurrentFunders`: Uses card grid
- These three pages show similar funder data in three different layouts.
- **Fix**: Pick one pattern per data type. Tables for comparison/sorting, cards for detail-rich browsing.

---

### Low: Polish Issues

**15. TopBar search is read-only placeholder**
The search bar shows `readOnly` with a `Cmd+F` hint but does nothing. This creates false affordance.
- **Fix**: Either implement search or remove the input (keep just an icon that explains "coming soon").

**16. Notification icons (Mail, Bell) are non-functional**
Same false affordance issue — buttons that do nothing.
- **Fix**: Add tooltips saying "Coming soon" or remove them.

**17. Pipeline Kanban not responsive**
The pipeline board uses `grid-cols-4` with no responsive breakpoint. On the current 885px viewport this will be cramped; on mobile it breaks.
- **Fix**: Add horizontal scroll or stack columns on smaller screens.

**18. Settings and Help links go to "#"**
Dead links in the sidebar.
- **Fix**: Either implement or hide behind a "Coming soon" state.

**19. Color inconsistency in charts**
`InvestorBenchmarks` hardcodes HSL values directly (`hsl(40 16% 83%)`, `hsl(152 42% 21%)`), while `InvestorOutcomes` uses CSS variables (`hsl(var(--chart-1))`). If the theme changes, Benchmarks won't update.
- **Fix**: Use CSS variable references consistently.

**20. "Milestone %" label is abbreviated**
On ScenarioPlanning, "Milestone %" is an unclear label. Users won't know what milestone this refers to.
- **Fix**: Use "Milestone Completion" with the "%" in the value.

---

### Files to Modify

| File | Changes |
|------|---------|
| `src/pages/investor/RenewalReadiness.tsx` | Extract renewal date to banner/KPI, fix Evidence Quality display, trim description |
| `src/pages/investor/InvestorOverview.tsx` | Use PageHeader, simplify duplicated charts to summaries, add confidence badges to health metrics |
| `src/pages/investor/InvestorBenchmarks.tsx` | Use CSS variable chart colors |
| `src/pages/investor/BeneficiaryVoice.tsx` | Move survey count out of description |
| `src/pages/investor/ScenarioPlanning.tsx` | Fix label, add responsive handling |
| `src/pages/internal/CapitalOverview.tsx` | Standardize table to Table component, add confidence badges to health metrics, standardize PageHeader usage |
| `src/pages/internal/Pipeline.tsx` | Add responsive breakpoints to Kanban |
| `src/components/shared/PageHeader.tsx` | Add optional `badge` slot prop for auxiliary info |
| `src/components/shared/KpiCard.tsx` | Add optional `icon` prop |
| `src/components/layout/AppSidebar.tsx` | Add missing navigation items or group orphaned pages |
| `src/components/layout/TopBar.tsx` | Add tooltips to non-functional elements |

### Implementation Order

1. Fix Renewal Readiness page (highest-impact single page fix)
2. Standardize PageHeader usage across all pages
3. Add missing sidebar navigation items
4. Add confidence badges to health impact metrics
5. Standardize KPI card usage
6. Fix chart color consistency
7. Polish: responsive pipeline, tooltips, dead links

