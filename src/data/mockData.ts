// === MOCK DATA FOR FRESH HOUSE CAPITAL INTELLIGENCE PLATFORM ===

// Investor-facing: clinical outcomes & ROI that funders care about
export const investorHealthMetrics = [
  { label: "Cholesterol Reduction", value: "-18%", description: "Avg LDL reduction across participants", icon: "heart" as const },
  { label: "Blood Pressure Reduction", value: "-12 mmHg", description: "Avg systolic BP improvement", icon: "activity" as const },
  { label: "Healthcare Savings", value: "$1,240", description: "Monthly per participant vs. control", icon: "dollar" as const },
  { label: "Social ROI", value: "3.2x", description: "Return per dollar invested", icon: "trending" as const },
];

// Internal/ops-facing: volume, efficiency & cost metrics
export const internalHealthMetrics = [
  { label: "Meals Delivered", value: "47,500", description: "Recipients served this fiscal year", icon: "utensils" as const },
  { label: "Cost per Beneficiary", value: "$218", description: "Monthly avg across all programs", icon: "dollar" as const },
  { label: "Adherence Rate", value: "83%", description: "Participants following care plans", icon: "activity" as const },
  { label: "Food Security Improvement", value: "+19pts", description: "Avg USDA score gain at 6 months", icon: "heart" as const },
];

export const kpiMetrics = {
  peopleServed: { value: 12847, change: 12.3, period: "vs last quarter", confidence: "validated" as const },
  activePrograms: { value: 8, change: 2, period: "new this year", confidence: "direct" as const },
  geographyCoverage: { value: 14, label: "counties", confidence: "direct" as const },
  milestoneProgress: { value: 78, label: "% complete", confidence: "validated" as const },
  beneficiarySatisfaction: { value: 4.6, label: "/ 5.0", change: 0.3, confidence: "self-reported" as const },
  renewalReadiness: { value: 82, label: "% ready", confidence: "proxy" as const },
};

export const outcomeTrend = [
  { month: "Jul", healthScore: 62, adherence: 71, satisfaction: 4.1, foodSecurity: 55 },
  { month: "Aug", healthScore: 64, adherence: 73, satisfaction: 4.2, foodSecurity: 58 },
  { month: "Sep", healthScore: 67, adherence: 74, satisfaction: 4.3, foodSecurity: 61 },
  { month: "Oct", healthScore: 69, adherence: 76, satisfaction: 4.3, foodSecurity: 63 },
  { month: "Nov", healthScore: 72, adherence: 78, satisfaction: 4.5, foodSecurity: 67 },
  { month: "Dec", healthScore: 71, adherence: 77, satisfaction: 4.4, foodSecurity: 66 },
  { month: "Jan", healthScore: 74, adherence: 80, satisfaction: 4.5, foodSecurity: 69 },
  { month: "Feb", healthScore: 76, adherence: 81, satisfaction: 4.6, foodSecurity: 72 },
  { month: "Mar", healthScore: 78, adherence: 83, satisfaction: 4.6, foodSecurity: 74 },
];

export const satisfactionTrend = [
  { month: "Jul", score: 4.1, responses: 342 },
  { month: "Aug", score: 4.2, responses: 389 },
  { month: "Sep", score: 4.3, responses: 401 },
  { month: "Oct", score: 4.3, responses: 378 },
  { month: "Nov", score: 4.5, responses: 412 },
  { month: "Dec", score: 4.4, responses: 395 },
  { month: "Jan", score: 4.5, responses: 428 },
  { month: "Feb", score: 4.6, responses: 445 },
  { month: "Mar", score: 4.6, responses: 461 },
];

export const beneficiaryQuotes = [
  { id: 1, text: "The meals helped me manage my diabetes better than any program I've tried before.", author: "Maria G.", program: "Medically Tailored Meals", region: "Bay Area", sentiment: "positive" as const },
  { id: 2, text: "Having culturally relevant food delivered was life-changing for my family during treatment.", author: "James T.", program: "Cancer Nutrition Support", region: "Central Valley", sentiment: "positive" as const },
  { id: 3, text: "I wish delivery times were more consistent — sometimes I have to rearrange my dialysis schedule.", author: "Patricia L.", program: "Renal Nutrition Program", region: "Sacramento", sentiment: "mixed" as const },
  { id: 4, text: "This program gave me hope during a very difficult time. The food was nourishing and comforting.", author: "Robert K.", program: "Post-Surgical Recovery", region: "Bay Area", sentiment: "positive" as const },
];

export const programs = [
  { id: 1, name: "Medically Tailored Meals", status: "active", peopleServed: 4230, budget: 2800000, milestoneProgress: 82 },
  { id: 2, name: "Cancer Nutrition Support", status: "active", peopleServed: 2150, budget: 1400000, milestoneProgress: 75 },
  { id: 3, name: "Renal Nutrition Program", status: "active", peopleServed: 1890, budget: 1200000, milestoneProgress: 88 },
  { id: 4, name: "Post-Surgical Recovery", status: "active", peopleServed: 1340, budget: 900000, milestoneProgress: 71 },
  { id: 5, name: "Maternal Health Nutrition", status: "active", peopleServed: 1620, budget: 1100000, milestoneProgress: 65 },
  { id: 6, name: "Senior Food Security", status: "active", peopleServed: 980, budget: 650000, milestoneProgress: 90 },
  { id: 7, name: "Pediatric Nutrition Access", status: "pilot", peopleServed: 420, budget: 350000, milestoneProgress: 45 },
  { id: 8, name: "Community Wellness Kitchen", status: "active", peopleServed: 217, budget: 280000, milestoneProgress: 58 },
];

export const benchmarks = [
  { metric: "Health Score Improvement", freshHouse: 78, industryAvg: 61, topQuartile: 74, confidence: "validated" as const },
  { metric: "Program Adherence", freshHouse: 83, industryAvg: 68, topQuartile: 79, confidence: "validated" as const },
  { metric: "Beneficiary Satisfaction", freshHouse: 4.6, industryAvg: 3.8, topQuartile: 4.3, confidence: "self-reported" as const },
  { metric: "Food Security Gain", freshHouse: 74, industryAvg: 52, topQuartile: 66, confidence: "proxy" as const },
  { metric: "Cost per Outcome", freshHouse: 1240, industryAvg: 1890, topQuartile: 1450, confidence: "direct" as const },
];

export const renewalMilestones = [
  { id: 1, name: "Q1 Outcome Report Delivered", status: "complete", date: "2026-01-15" },
  { id: 2, name: "Mid-Year Impact Assessment", status: "complete", date: "2026-02-28" },
  { id: 3, name: "Beneficiary Survey (N>400)", status: "complete", date: "2026-03-10" },
  { id: 4, name: "Financial Reconciliation", status: "in-progress", date: "2026-04-15" },
  { id: 5, name: "Annual Outcomes Presentation", status: "upcoming", date: "2026-05-01" },
  { id: 6, name: "Renewal Proposal Submission", status: "upcoming", date: "2026-06-01" },
];

export const scenarios = [
  {
    id: 1, name: "Base Case", funding: 8500000, peopleServed: 12800, counties: 14,
    programs: 8, milestoneCompletion: 78, description: "Current funding level maintained"
  },
  {
    id: 2, name: "Growth Case", funding: 12000000, peopleServed: 18500, counties: 22,
    programs: 11, milestoneCompletion: 85, description: "40% increase enables expansion to new regions"
  },
  {
    id: 3, name: "Constrained Case", funding: 6000000, peopleServed: 9200, counties: 10,
    programs: 6, milestoneCompletion: 70, description: "Budget reduction requires program prioritization"
  },
];

export const dataRoomDocuments = [
  { id: 1, title: "2025 Annual Impact Report", category: "Impact Summary", type: "PDF", size: "4.2 MB", date: "2026-01-15" },
  { id: 2, title: "Program-Level KPI Summary", category: "KPI Definitions", type: "PDF", size: "1.8 MB", date: "2026-02-01" },
  { id: 3, title: "Methodology & Data Sources", category: "Methodology", type: "PDF", size: "2.1 MB", date: "2026-01-20" },
  { id: 4, title: "Financial Overview FY2025", category: "Financial", type: "XLSX", size: "890 KB", date: "2026-01-30" },
  { id: 5, title: "Medically Tailored Meals — Program Brief", category: "Program Summaries", type: "PDF", size: "1.3 MB", date: "2025-12-15" },
  { id: 6, title: "Cancer Nutrition Support — Program Brief", category: "Program Summaries", type: "PDF", size: "1.1 MB", date: "2025-12-15" },
  { id: 7, title: "Q4 2025 Milestone Report", category: "Milestone Reports", type: "PDF", size: "2.4 MB", date: "2026-01-10" },
  { id: 8, title: "Beneficiary Insights Digest", category: "Beneficiary Insights", type: "PDF", size: "3.6 MB", date: "2026-03-01" },
  { id: 9, title: "Outcome Benchmarking Analysis", category: "Prior Reports", type: "PDF", size: "1.9 MB", date: "2025-11-20" },
  { id: 10, title: "Renal Nutrition — Program Brief", category: "Program Summaries", type: "PDF", size: "1.0 MB", date: "2025-12-15" },
];

export const funders = [
  { id: 1, name: "Blue Shield Foundation", type: "Foundation", checkSize: 2500000, programs: ["Medically Tailored Meals", "Cancer Nutrition Support"], renewalDate: "2026-09-30", engagement: "high" as const, renewalScore: 88, risks: ["Outcome reporting lag"], owner: "Sarah Chen" },
  { id: 2, name: "Kaiser Permanente Community", type: "Health System", checkSize: 1800000, programs: ["Renal Nutrition Program"], renewalDate: "2026-07-15", engagement: "medium" as const, renewalScore: 72, risks: ["Budget cycle uncertainty"], owner: "Marcus Johnson" },
  { id: 3, name: "USDA TEFAP Innovation", type: "Government", checkSize: 3200000, programs: ["Senior Food Security", "Community Wellness Kitchen"], renewalDate: "2026-12-31", engagement: "high" as const, renewalScore: 91, risks: [], owner: "Sarah Chen" },
  { id: 4, name: "CalAIM / Medi-Cal", type: "Payer", checkSize: 4100000, programs: ["Medically Tailored Meals", "Post-Surgical Recovery"], renewalDate: "2026-06-30", engagement: "high" as const, renewalScore: 85, risks: ["Policy change risk"], owner: "David Park" },
  { id: 5, name: "Robert Wood Johnson Foundation", type: "Foundation", checkSize: 1200000, programs: ["Maternal Health Nutrition"], renewalDate: "2027-03-31", engagement: "low" as const, renewalScore: 58, risks: ["Low engagement", "Competing priorities"], owner: "Marcus Johnson" },
  { id: 6, name: "Anthem Blue Cross", type: "Payer", checkSize: 900000, programs: ["Pediatric Nutrition Access"], renewalDate: "2026-11-30", engagement: "medium" as const, renewalScore: 67, risks: ["Pilot stage only"], owner: "David Park" },
];

export const pipeline = [
  { id: 1, name: "Gates Foundation", stage: "Discovery", fitScore: 82, amount: 2000000, owner: "Sarah Chen", nextMeeting: "2026-04-12", objectionRisk: "low" as const, materialsReady: true },
  { id: 2, name: "Cigna Healthspring", stage: "Proposal", fitScore: 76, amount: 1500000, owner: "David Park", nextMeeting: "2026-04-18", objectionRisk: "medium" as const, materialsReady: true },
  { id: 3, name: "Kresge Foundation", stage: "Discovery", fitScore: 71, amount: 800000, owner: "Marcus Johnson", nextMeeting: "2026-04-22", objectionRisk: "low" as const, materialsReady: false },
  { id: 4, name: "UnitedHealth Group", stage: "LOI", fitScore: 88, amount: 3500000, owner: "Sarah Chen", nextMeeting: "2026-04-09", objectionRisk: "medium" as const, materialsReady: true },
  { id: 5, name: "California Endowment", stage: "Negotiation", fitScore: 85, amount: 1200000, owner: "David Park", nextMeeting: "2026-04-15", objectionRisk: "low" as const, materialsReady: true },
  { id: 6, name: "Centene Corporation", stage: "Discovery", fitScore: 69, amount: 1800000, owner: "Marcus Johnson", nextMeeting: null, objectionRisk: "high" as const, materialsReady: false },
];

export const objections = [
  { id: 1, funder: "Kaiser Permanente Community", objection: "Sample size too small for statistical significance", severity: "high" as const, rationale: "Renal program cohort is N=89, below their threshold of N=150", evidence: "Outcome data spreadsheet, methodology doc", suggestedAnswer: "We are expanding enrollment and can provide interim confidence intervals. Our effect size (d=0.74) compensates for smaller N.", materials: ["Statistical Power Analysis", "Interim Results Brief"] },
  { id: 2, funder: "Robert Wood Johnson Foundation", objection: "Unclear attribution of health outcomes to meals program", severity: "high" as const, rationale: "Participants receive multiple interventions; isolation is difficult", evidence: "Program design document", suggestedAnswer: "We use propensity score matching with a comparable non-participant cohort and control for concurrent interventions.", materials: ["Attribution Methodology Paper", "Comparison Cohort Summary"] },
  { id: 3, funder: "Anthem Blue Cross", objection: "Cost per beneficiary above Medicaid benchmark", severity: "medium" as const, rationale: "Current cost is $1,240/person vs $980 Medicaid average for similar programs", evidence: "Financial overview, benchmark analysis", suggestedAnswer: "Our medically tailored approach yields 2.3x better adherence and 40% fewer ER visits, making the total cost of care lower.", materials: ["Cost-Effectiveness Analysis", "ER Utilization Comparison"] },
  { id: 4, funder: "CalAIM / Medi-Cal", objection: "Geographic coverage gaps in underserved counties", severity: "medium" as const, rationale: "3 of the highest-need counties not yet covered", evidence: "Coverage map, county health rankings", suggestedAnswer: "Phase 2 expansion plan targets these counties by Q3 2026 with local kitchen partnerships already in development.", materials: ["Expansion Roadmap", "Partner MOUs"] },
  { id: 5, funder: "Blue Shield Foundation", objection: "Lack of long-term follow-up data beyond 12 months", severity: "low" as const, rationale: "Most outcome data is 6-month post-enrollment", evidence: "Outcome timeline document", suggestedAnswer: "We are implementing 18-month longitudinal tracking starting Q2 2026. Early 12-month data from our pilot cohort shows sustained improvements.", materials: ["Longitudinal Study Design", "12-Month Pilot Results"] },
];

export type FunderArchetype = "health-payer" | "foundation" | "government" | "health-system";

export const archetypeInfo: Record<FunderArchetype, { label: string; motivation: string; evidenceNeeded: string; pitchFocus: string; icon: string }> = {
  "health-payer": {
    label: "Health Payers",
    motivation: "Cost savings, reduced ER visits, improved member outcomes",
    evidenceNeeded: "Claims data, cost-effectiveness analysis, ROI modeling",
    pitchFocus: "Total cost of care reduction and quality metric improvement",
    icon: "HP",
  },
  foundation: {
    label: "Foundations",
    motivation: "Mission alignment, community impact, innovation",
    evidenceNeeded: "Outcome narratives, beneficiary voice, theory of change",
    pitchFocus: "Human impact stories backed by validated outcome data",
    icon: "FN",
  },
  government: {
    label: "Government",
    motivation: "Compliance, population reach, equity outcomes",
    evidenceNeeded: "Volume metrics, geographic coverage, regulatory compliance",
    pitchFocus: "Scale, equity reach, and alignment with federal/state priorities",
    icon: "GV",
  },
  "health-system": {
    label: "Health Systems",
    motivation: "Community benefit, readmission reduction, value-based care",
    evidenceNeeded: "Clinical evidence, readmission data, patient satisfaction",
    pitchFocus: "Clinical integration and measurable community health benefit",
    icon: "HS",
  },
};

export const funderFitScores = [
  { id: 1, funderName: "Gates Foundation", archetype: "foundation" as FunderArchetype, fitScore: 82, capitalFit: "High", geoFit: "Medium", checkSizeFit: "High", thesisFit: "High", priorComparables: 3, outreachAngle: "Global nutrition innovation with evidence-based approach" },
  { id: 2, funderName: "Cigna Healthspring", archetype: "health-payer" as FunderArchetype, fitScore: 76, capitalFit: "High", geoFit: "High", checkSizeFit: "Medium", thesisFit: "High", priorComparables: 5, outreachAngle: "Payer cost reduction through preventive nutrition" },
  { id: 3, funderName: "Kresge Foundation", archetype: "foundation" as FunderArchetype, fitScore: 71, capitalFit: "Medium", geoFit: "Medium", checkSizeFit: "High", thesisFit: "Medium", priorComparables: 2, outreachAngle: "Health equity and place-based community resilience" },
  { id: 4, funderName: "UnitedHealth Group", archetype: "health-payer" as FunderArchetype, fitScore: 88, capitalFit: "High", geoFit: "High", checkSizeFit: "High", thesisFit: "High", priorComparables: 7, outreachAngle: "Evidence-based Food-as-Medicine at payer scale" },
  { id: 5, funderName: "Centene Corporation", archetype: "health-payer" as FunderArchetype, fitScore: 69, capitalFit: "Medium", geoFit: "High", checkSizeFit: "Medium", thesisFit: "Medium", priorComparables: 1, outreachAngle: "Medicaid population health and cost management" },
  { id: 6, funderName: "W.K. Kellogg Foundation", archetype: "foundation" as FunderArchetype, fitScore: 74, capitalFit: "High", geoFit: "Medium", checkSizeFit: "High", thesisFit: "High", priorComparables: 2, outreachAngle: "Racial equity in food systems and child nutrition" },
  { id: 7, funderName: "LA County DPSS", archetype: "government" as FunderArchetype, fitScore: 78, capitalFit: "High", geoFit: "High", checkSizeFit: "Medium", thesisFit: "High", priorComparables: 4, outreachAngle: "CalFresh alignment and underserved population reach" },
  { id: 8, funderName: "Dignity Health", archetype: "health-system" as FunderArchetype, fitScore: 80, capitalFit: "High", geoFit: "High", checkSizeFit: "Medium", thesisFit: "High", priorComparables: 3, outreachAngle: "Community benefit reporting and readmission prevention" },
];

export const fundingHistory = [
  { year: "FY 2022-23", amount: 9200000, funders: 4 },
  { year: "FY 2023-24", amount: 11800000, funders: 5 },
  { year: "FY 2024-25", amount: 13700000, funders: 6 },
  { year: "FY 2025-26", amount: 8600000, funders: 6, note: "YTD Q3" },
];

export const capitalRecommendations = [
  { id: 1, program: "Medically Tailored Meals", source: "Payer Partnership", rationale: "Strong clinical evidence supports reimbursement pathway", durability: "High", evidenceRequired: "RCT or quasi-experimental design", buyerType: "Managed care organizations", risk: "Policy dependency", nextStep: "Engage actuarial firm for cost modeling" },
  { id: 2, program: "Cancer Nutrition Support", source: "Multi-Year Grant", rationale: "Foundation interest in cancer care innovation is high", durability: "Medium", evidenceRequired: "Outcome data + beneficiary voice", buyerType: "Health-focused foundations", risk: "Grant cycle dependency", nextStep: "Submit LOI to 3 targeted foundations" },
  { id: 3, program: "Renal Nutrition Program", source: "Outcomes-Based Funding", rationale: "Clear cost savings from reduced dialysis complications", durability: "High", evidenceRequired: "Claims data linkage", buyerType: "Health systems & payers", risk: "Data sharing agreements needed", nextStep: "Negotiate data sharing with partner health system" },
  { id: 4, program: "Maternal Health Nutrition", source: "Blended Capital", rationale: "Mix of philanthropy and Medicaid waiver funding possible", durability: "Medium", evidenceRequired: "Birth outcome data + cost analysis", buyerType: "State agencies + foundations", risk: "Complex structure", nextStep: "Map blended capital model with advisor" },
  { id: 5, program: "Senior Food Security", source: "Government Contract", rationale: "Strong alignment with TEFAP and OAA priorities", durability: "High", evidenceRequired: "Compliance + volume metrics", buyerType: "Federal/state agencies", risk: "Regulatory changes", nextStep: "Prepare FY2027 TEFAP application" },
  { id: 6, program: "Community Wellness Kitchen", source: "Philanthropy", rationale: "Community-centered model appeals to place-based funders", durability: "Low", evidenceRequired: "Community engagement metrics", buyerType: "Local/regional foundations", risk: "Scale limitations", nextStep: "Build case study with 3 community partners" },
];

export const beneficiaryMetrics = {
  satisfaction: 4.6,
  responseRate: 68,
  avgResponseTime: "4.2 hrs",
  totalResponses: 461,
  whatsappActive: 312,
  channelBreakdown: { whatsapp: 67, sms: 18, phone: 10, inPerson: 5 },
  mealQuality: 4.4,
  deliveryExperience: 4.1,
  culturalRelevance: 4.5,
  adherence: 83,
  usefulness: 4.7,
  recurringIssues: [
    { issue: "Delivery time inconsistency", frequency: 18, trend: "improving" as const },
    { issue: "Portion size concerns", frequency: 12, trend: "stable" as const },
    { issue: "Allergen labeling clarity", frequency: 8, trend: "improving" as const },
    { issue: "Menu variety requests", frequency: 15, trend: "stable" as const },
  ],
  sentimentTrend: [
    { month: "Jul", positive: 72, neutral: 20, negative: 8 },
    { month: "Aug", positive: 74, neutral: 19, negative: 7 },
    { month: "Sep", positive: 76, neutral: 18, negative: 6 },
    { month: "Oct", positive: 75, neutral: 19, negative: 6 },
    { month: "Nov", positive: 79, neutral: 16, negative: 5 },
    { month: "Dec", positive: 78, neutral: 17, negative: 5 },
    { month: "Jan", positive: 80, neutral: 15, negative: 5 },
    { month: "Feb", positive: 82, neutral: 14, negative: 4 },
    { month: "Mar", positive: 83, neutral: 13, negative: 4 },
  ],
};

export const aiChatMessages = [
  { role: "assistant" as const, content: "Welcome to the Fresh House data assistant. I can help you explore outcomes, compare cohorts, and understand methodology. What would you like to know?", sources: [] },
];

export const aiSuggestedPrompts = [
  "Show outcome changes over the last 2 quarters",
  "Why did the adherence metric decline in December?",
  "Which data is self-reported vs. validated?",
  "Compare Bay Area outcomes to Central Valley",
  "What supports the food security improvement claim?",
  "How does our cost per outcome compare to benchmarks?",
];
