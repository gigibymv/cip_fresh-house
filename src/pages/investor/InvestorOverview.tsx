import { PageHeader } from "@/components/shared/PageHeader";
import { KpiCard } from "@/components/shared/KpiCard";
import { ConfidenceBadge } from "@/components/shared/ConfidenceBadge";
import { kpiMetrics, outcomeTrend, beneficiaryQuotes, programs, funders, investorHealthMetrics } from "@/data/mockData";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, ArrowRight, Users, TrendingUp, Heart, Activity, DollarSign, UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

const metricIcons = {
  heart: Heart,
  activity: Activity,
  dollar: DollarSign,
  utensils: UtensilsCrossed,
  trending: TrendingUp,
} as const;

const confidenceMap: Record<string, "validated" | "self-reported" | "proxy" | "direct"> = {
  "Cholesterol Reduction": "validated",
  "Blood Pressure Reduction": "validated",
  "Healthcare Savings": "direct",
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
        title="Welcome back, Blue Shield Foundation"
        description="Here's how your funded programs at Fresh House are performing."
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <KpiCard
          highlighted
          title="People Served"
          description="Total beneficiaries across your 2 funded programs"
          value={formatKpi(totalServed)}
          change={kpiMetrics.peopleServed.change}
          period={kpiMetrics.peopleServed.period}
        />
        <KpiCard
          title="Active Programs"
          description="Programs you currently fund at Fresh House"
          value={fundedPrograms.length}
          subtitle="Funded by Blue Shield"
        />
        <KpiCard
          title="Milestone Progress"
          description="Completion rate of agreed deliverables"
          value={`${Math.round(fundedPrograms.reduce((s, p) => s + p.milestoneProgress, 0) / fundedPrograms.length)}%`}
          subtitle="On track"
        />
        <KpiCard
          title="Renewal Readiness"
          description="How prepared we are for your next renewal cycle"
          value={`${blueShield.renewalScore}%`}
          subtitle={`Renewal: ${new Date(blueShield.renewalDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`}
        />
      </div>

      {/* Health Impact Metrics */}
      <div>
        <h2 className="text-lg font-bold text-foreground mb-1">Health Impact Highlights</h2>
        <p className="text-sm text-muted-foreground mb-4">Key clinical outcomes across your funded programs.</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {investorHealthMetrics.map((m) => {
            const Icon = metricIcons[m.icon];
            return (
              <div key={m.label} className="rounded-2xl bg-card border border-border p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="h-9 w-9 rounded-xl bg-forest/10 flex items-center justify-center">
                    <Icon className="h-4 w-4 text-forest" />
                  </div>
                  <ConfidenceBadge level={confidenceMap[m.label] || "proxy"} />
                </div>
                <div>
                  <p className="text-3xl font-extrabold tracking-tight text-foreground">{m.value}</p>
                  <p className="text-xs font-medium text-muted-foreground mt-1">{m.label}</p>
                  <p className="text-[11px] text-muted-foreground/70 mt-0.5">{m.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-bold text-foreground mb-1">Your Funded Programs</h2>
        <p className="text-sm text-muted-foreground mb-4">
          These are the programs your ${formatKpi(totalBudget / 1000)}K investment supports. Click to explore detailed outcomes.
        </p>
        <div className="grid sm:grid-cols-2 gap-5">
          {fundedPrograms.map((prog) => {
            const meta = programDescriptions[prog.name];
            return (
              <Card key={prog.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/investor/outcomes')}>
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-foreground">{prog.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed max-w-sm">
                        {meta?.description}
                      </p>
                    </div>
                    <div className="h-10 w-10 rounded-xl bg-status-success-muted flex items-center justify-center shrink-0">
                      <Users className="h-5 w-5 text-chart-1" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">People Served</p>
                      <p className="text-xl font-bold tabular-nums">{prog.peopleServed.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Budget</p>
                      <p className="text-xl font-bold tabular-nums">${(prog.budget / 1000000).toFixed(1)}M</p>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <p className="text-xs text-muted-foreground">Milestone Progress</p>
                      <p className="text-xs font-semibold tabular-nums">{prog.milestoneProgress}%</p>
                    </div>
                    <Progress value={prog.milestoneProgress} className="h-2" />
                  </div>

                  {meta?.impact && (
                    <div className="flex items-start gap-2 p-3 rounded-lg bg-status-success-muted border border-status-success/10">
                      <TrendingUp className="h-4 w-4 text-chart-1 shrink-0 mt-0.5" />
                      <p className="text-xs text-foreground/80 leading-relaxed">{meta.impact}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Outcomes Trend — compact summary with link */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-bold">Outcomes Trend <span className="text-sm font-normal text-muted-foreground ml-2">Jul 2025 – Mar 2026</span></CardTitle>
            <Button variant="ghost" size="sm" className="text-xs gap-1" onClick={() => navigate('/investor/outcomes')}>
              View details <ArrowRight className="h-3 w-3" />
            </Button>
          </div>
          <div className="flex gap-4 text-xs text-muted-foreground font-normal mt-2">
            <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-chart-1 inline-block" />Health Score</span>
            <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-chart-2 inline-block" />Adherence</span>
            <span className="flex items-center gap-1.5"><span className="h-[1px] w-4 border-t-2 border-dashed border-muted-foreground/40 inline-block" />Target (80)</span>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={outcomeTrend}>
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke={CHART.axis} />
              <YAxis tick={{ fontSize: 12 }} stroke={CHART.axis} domain={[50, 100]} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 12, border: `1px solid ${CHART.border}` }} />
              <ReferenceLine y={80} stroke={CHART.muted} strokeDasharray="6 4" strokeOpacity={0.4} />
              <Line type="monotone" dataKey="healthScore" stroke={CHART.c1} strokeWidth={2.5} dot={false} name="Health Score" />
              <Line type="monotone" dataKey="adherence" stroke={CHART.c2} strokeWidth={2.5} dot={false} name="Adherence" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Beneficiary Feedback + AI Chat */}
      <div className="grid sm:grid-cols-2 gap-5">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold">Beneficiary Feedback</CardTitle>
            <p className="text-xs text-muted-foreground mt-1">
              Here's what program participants are saying about the impact of your funding.
            </p>
          </CardHeader>
          <CardContent className="space-y-3">
            {beneficiaryQuotes.slice(0, 2).map((q) => (
              <div key={q.id} className="p-4 rounded-xl bg-background border text-sm">
                <p className="italic text-foreground/80 leading-relaxed">"{q.text}"</p>
                <p className="text-xs text-muted-foreground mt-2">— {q.author}, {q.program}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-chart-1 to-chart-2 text-primary-foreground border-none flex flex-col">
          <CardContent className="pt-8 flex flex-col justify-between flex-1">
            <div>
              <MessageSquare className="h-8 w-8 mb-4 opacity-80" />
              <h3 className="text-xl font-bold">Ask the Data</h3>
              <p className="text-sm opacity-80 mt-2 leading-relaxed">Have a question about your programs? Ask our AI assistant to explore outcomes, compare cohorts, or explain methodology.</p>
            </div>
            <Button variant="secondary" className="mt-8 w-full rounded-xl h-11 font-semibold" onClick={() => navigate('/investor/ai-chat')}>
              Start a conversation <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
