import { PageHeader } from "@/components/shared/PageHeader";
import { KpiCard } from "@/components/shared/KpiCard";
import { ConfidenceBadge } from "@/components/shared/ConfidenceBadge";
import { funders, pipeline, fundingHistory, internalHealthMetrics } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertTriangle, DollarSign, RefreshCw, TrendingUp, Calendar, Heart, Activity, UtensilsCrossed } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Badge } from "@/components/ui/badge";

const metricIcons = {
  heart: Heart,
  activity: Activity,
  dollar: DollarSign,
  utensils: UtensilsCrossed,
  trending: TrendingUp,
} as const;

const confidenceMap: Record<string, "validated" | "self-reported" | "proxy" | "direct"> = {
  "Meals Delivered": "direct",
  "Cost per Beneficiary": "direct",
  "Adherence Rate": "validated",
  "Food Security Improvement": "proxy",
};

export default function CapitalOverview() {
  const totalCapital = funders.reduce((s, f) => s + f.checkSize, 0);
  const atRisk = funders.filter(f => f.renewalScore < 70);
  const renewalsDue = funders.filter(f => new Date(f.renewalDate) < new Date("2026-09-01"));
  const pipelineTotal = pipeline.reduce((s, p) => s + p.amount, 0);

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      <PageHeader
        title="Dashboard"
        description="Internal operating view for capital strategy and funder management."
        badge={
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-mist/50 border border-mist">
            <Calendar className="h-3.5 w-3.5 text-teal" />
            <span className="text-xs font-semibold">FY 2025–2026</span>
            <span className="text-[10px] text-muted-foreground">Q3</span>
          </div>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        <KpiCard highlighted title="Total Capital Raised" value={`$${(totalCapital / 1000000).toFixed(1)}M`} />
        <KpiCard title="Active Funders" value={funders.length} subtitle="Across all programs" />
        <KpiCard title="Renewals Due" value={renewalsDue.length} subtitle="Within 6 months" />
        <KpiCard title="Pipeline Value" value={`$${(pipelineTotal / 1000000).toFixed(1)}M`} subtitle="In discussion" />
      </div>

      {/* Health Impact Metrics */}
      <div>
        <h2 className="text-lg font-bold text-foreground mb-1">Health Impact Highlights</h2>
        <p className="text-sm text-muted-foreground mb-4">Aggregate clinical outcomes across all programs.</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {internalHealthMetrics.map((m) => {
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

      {/* Funding History Chart */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-bold flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-teal" /> Funding History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={fundingHistory} barSize={48}>
                <XAxis dataKey="year" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tickFormatter={(v) => `$${(v / 1000000).toFixed(0)}M`} tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip
                  formatter={(value: number) => [`$${(value / 1000000).toFixed(1)}M`, "Capital Raised"]}
                  contentStyle={{ borderRadius: "12px", border: "1px solid hsl(var(--border))", fontSize: "13px" }}
                />
                <Bar dataKey="amount" radius={[8, 8, 0, 0]}>
                  {fundingHistory.map((entry, index) => (
                    <Cell key={index} fill={index === fundingHistory.length - 1 ? "hsl(var(--teal))" : "hsl(var(--forest))"} opacity={index === fundingHistory.length - 1 ? 0.7 : 1} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
            {fundingHistory.map((fy) => (
              <div key={fy.year} className="flex items-center gap-1.5">
                <span className="font-medium">{fy.year}:</span>
                <span>{fy.funders} funders</span>
                {fy.note && <Badge variant="secondary" className="text-[9px] py-0">{fy.note}</Badge>}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-5">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-terracotta" /> At Risk Funders
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {atRisk.length === 0 ? <p className="text-sm text-muted-foreground">No funders currently at risk.</p> :
              atRisk.map(f => (
                <div key={f.id} className="flex items-center justify-between p-4 rounded-xl bg-destructive/5 border border-destructive/10 text-sm">
                  <div>
                    <p className="font-semibold">{f.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{f.risks.join(", ")}</p>
                  </div>
                  <span className="text-sm font-bold tabular-nums text-terracotta">{f.renewalScore}</span>
                </div>
              ))
            }
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold">Recommended Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-olive/30 border border-olive/50">
              <RefreshCw className="h-5 w-5 text-forest mt-0.5 shrink-0" />
              <div><p className="font-semibold">Schedule renewal call with RWJF</p><p className="text-xs text-muted-foreground mt-0.5">Renewal score: 58 — engagement declining</p></div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl bg-mist/50 border border-mist">
              <DollarSign className="h-5 w-5 text-teal mt-0.5 shrink-0" />
              <div><p className="font-semibold">Prepare UnitedHealth LOI response</p><p className="text-xs text-muted-foreground mt-0.5">$3.5M opportunity — meeting April 9</p></div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-xl bg-mist/50 border border-mist">
              <TrendingUp className="h-5 w-5 text-teal mt-0.5 shrink-0" />
              <div><p className="font-semibold">Update financial reconciliation</p><p className="text-xs text-muted-foreground mt-0.5">Required for Blue Shield renewal readiness</p></div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-bold">Funder Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Funder</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Check Size</TableHead>
                <TableHead>Renewal</TableHead>
                <TableHead className="text-right">Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {funders.map(f => (
                <TableRow key={f.id}>
                  <TableCell className="font-semibold">{f.name}</TableCell>
                  <TableCell className="text-muted-foreground">{f.type}</TableCell>
                  <TableCell className="text-right tabular-nums">${(f.checkSize / 1000000).toFixed(1)}M</TableCell>
                  <TableCell className="text-muted-foreground tabular-nums">{f.renewalDate}</TableCell>
                  <TableCell className="text-right font-bold tabular-nums">{f.renewalScore}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
