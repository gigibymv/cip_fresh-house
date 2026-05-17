import { PageHeader } from "@/components/shared/PageHeader";
import { KpiCard } from "@/components/shared/KpiCard";
import { ConfidenceBadge } from "@/components/shared/ConfidenceBadge";
import { kpiMetrics, outcomeTrend, beneficiaryQuotes, programs, funders, investorHealthMetrics } from "@/data/mockData";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, ArrowRight, Users, TrendingUp, Heart, Activity, DollarSign, UtensilsCrossed, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import { TrustStrip } from "@/components/shared/TrustStrip";

const metricIcons = {
  heart: Heart,
  activity: Activity,
  dollar: DollarSign,
  utensils: UtensilsCrossed,
  trending: TrendingUp,
} as const;

const confidenceMap: Record<string, "validated" | "self-reported" | "proxy" | "directional"> = {
  "Cholesterol Reduction": "validated",
  "Blood Pressure Reduction": "validated",
  "Healthcare Savings": "directional",
  "Social ROI": "proxy",
};

function formatKpi(value: number): string {
  if (value >= 10000) return `${(value / 1000).toFixed(1).replace(/\.0$/, '')}K`;
  return value.toLocaleString();
}

const blueShield = funders.find(f => f.name === "Blue Shield Foundation")!;
const fundedPrograms = programs.filter(p => blueShield.programs.includes(p.name));
const totalBudget = fundedPrograms.reduce((sum, p) => sum + p.budget, 0);
const totalServed = fundedPrograms.reduce((sum, p) => sum + p.peopleServed, 0);

const programDescriptions: Record<string, { description: string; impact: string }> = {
  "Medically Tailored Meals": {
    description: "Home-delivered, dietitian-designed meals for patients with chronic conditions like diabetes, cancer, and heart disease.",
    impact: "Participants show 23% improvement in clinical health scores after 6 months.",
  },
  "Cancer Nutrition Support": {
    description: "Specialized nutrition plans and meal delivery for patients undergoing cancer treatment, addressing treatment side effects.",
    impact: "87% of participants maintained body weight during treatment, vs. 61% industry average.",
  },
};

const CHART = {
  c1: "hsl(var(--chart-1))",
  c2: "hsl(var(--chart-2))",
  c3: "hsl(var(--chart-3))",
  grid: "hsl(var(--chart-grid))",
  axis: "hsl(var(--chart-axis))",
  border: "hsl(var(--border))",
  muted: "hsl(var(--muted-foreground))",
};

export default function InvestorOverview() {
  const navigate = useNavigate();
  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      <PageHeader
        title="Portfolio Overview"
        description="Performance and evidence summary for Blue Shield Foundation funded programs."
      />

      {/* 1. Portfolio Summary KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <KpiCard
          highlighted
          title="Beneficiaries Reached"
          description="Total active participants across 2 funded programs"
          value={formatKpi(totalServed)}
          change={kpiMetrics.peopleServed.change}
          period={kpiMetrics.peopleServed.period}
        />
        <KpiCard
          title="Active Programs"
          description="Total programs supported by current funding"
          value={fundedPrograms.length}
          subtitle="Funded by Blue Shield"
        />
        <KpiCard
          title="Milestone Completion"
          description="Average progress on agreed operational deliverables"
          value={`${Math.round(fundedPrograms.reduce((s, p) => s + p.milestoneProgress, 0) / fundedPrograms.length)}%`}
          subtitle="On track for Q3"
        />
        <KpiCard
          title="Renewal Readiness"
          description="Overall preparedness score for upcoming renewal cycle"
          value={`${blueShield.renewalScore}%`}
          subtitle={`Target: ${new Date(blueShield.renewalDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`}
        />
      </div>

      {/* 2. Health Impact Highlights & Evidence Quality */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div>
            <h2 className="text-lg font-bold text-foreground mb-1">Health Impact Highlights</h2>
            <p className="text-sm text-muted-foreground mb-4">Key clinical outcomes aggregated across funded programs.</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {investorHealthMetrics.slice(0, 4).map((m) => {
                const Icon = metricIcons[m.icon];
                return (
                  <div key={m.label} className="premium-card p-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="h-10 w-10 rounded-xl bg-forest/10 flex items-center justify-center">
                        <Icon className="h-5 w-5 text-forest" />
                      </div>
                      <ConfidenceBadge level={confidenceMap[m.label] || "proxy"} />
                    </div>
                    <div>
                      <p className="text-3xl font-extrabold tracking-tight text-foreground">{m.value}</p>
                      <p className="text-sm font-semibold text-foreground/80 mt-1">{m.label}</p>
                      <p className="text-xs text-muted-foreground/80 mt-1 leading-relaxed">{m.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <Card className="premium-card border-none shadow-md">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-bold">Longitudinal Outcomes Trend <span className="text-sm font-normal text-muted-foreground ml-2">Jul 2025 – Mar 2026</span></CardTitle>
                <Button variant="ghost" size="sm" className="text-xs gap-1 font-semibold text-forest hover:text-forest" onClick={() => navigate('/investor/outcomes')}>
                  View full analysis <ArrowRight className="h-3 w-3" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={outcomeTrend}>
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke={CHART.axis} />
                  <YAxis tick={{ fontSize: 11 }} stroke={CHART.axis} domain={[50, 100]} />
                  <Tooltip contentStyle={{ fontSize: 12, borderRadius: 12, border: `1px solid ${CHART.border}` }} />
                  <ReferenceLine y={80} stroke={CHART.muted} strokeDasharray="6 4" strokeOpacity={0.4} />
                  <Line type="monotone" dataKey="healthScore" stroke={CHART.c1} strokeWidth={2.5} dot={false} name="Health Score" />
                  <Line type="monotone" dataKey="adherence" stroke={CHART.c2} strokeWidth={2.5} dot={false} name="Adherence" />
                </LineChart>
              </ResponsiveContainer>
              <TrustStrip 
                source="EHR Integration & Survey Data" 
                updated="Mar 15, 2026" 
                sample="n=1,204" 
                confidence="validated" 
              />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-bold text-foreground mb-1">Funded Programs</h2>
            <p className="text-sm text-muted-foreground mb-4">Capital allocation and milestone tracking.</p>
            <div className="space-y-4">
              {fundedPrograms.map((prog) => {
                const meta = programDescriptions[prog.name];
                return (
                  <Card key={prog.id} className="premium-card cursor-pointer" onClick={() => navigate('/investor/outcomes')}>
                    <CardContent className="p-4 space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-sm text-foreground">{prog.name}</h3>
                          <p className="text-xs text-muted-foreground mt-1 tabular-nums">
                            Budget: ${(prog.budget / 1000000).toFixed(1)}M
                          </p>
                        </div>
                        <div className="h-8 w-8 rounded-lg bg-forest/10 flex items-center justify-center shrink-0">
                          <Users className="h-4 w-4 text-forest" />
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">Milestone Progress</p>
                          <p className="text-[11px] font-bold tabular-nums">{prog.milestoneProgress}%</p>
                        </div>
                        <Progress value={prog.milestoneProgress} className="h-1.5 bg-muted" />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          <Card className="premium-card bg-gradient-to-br from-forest to-teal text-primary-foreground border-none flex flex-col shadow-lg shadow-forest/20">
            <CardContent className="p-6 flex flex-col justify-between h-full">
              <div>
                <div className="h-10 w-10 bg-white/10 rounded-xl flex items-center justify-center mb-4">
                  <ShieldCheck className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-bold">Ask the Data</h3>
                <p className="text-sm text-primary-foreground/80 mt-2 leading-relaxed">
                  Query our AI analyst to explore evidence methodology, compare cohort outcomes, and investigate specific KPIs.
                </p>
              </div>
              <Button variant="secondary" className="mt-6 w-full rounded-lg h-10 font-bold text-forest bg-white hover:bg-white/90" onClick={() => navigate('/investor/ask-the-data')}>
                Open Data Analyst <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 4. Beneficiary Voice */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-foreground mb-1">Beneficiary Voice</h2>
            <p className="text-sm text-muted-foreground">Qualitative impact reported directly by program participants.</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => navigate('/investor/beneficiary-voice')} className="text-xs font-semibold">
            Read all feedback
          </Button>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {beneficiaryQuotes.slice(0, 3).map((q) => (
            <Card key={q.id} className="premium-card">
              <CardContent className="p-5 flex flex-col h-full justify-between">
                <p className="italic text-sm text-foreground/80 leading-relaxed">"{q.text}"</p>
                <div className="mt-4 pt-4 border-t border-border/50">
                  <p className="text-xs font-semibold text-foreground">{q.author}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{q.program}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

    </div>
  );
}
