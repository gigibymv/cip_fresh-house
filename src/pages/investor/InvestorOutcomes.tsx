import { PageHeader } from "@/components/shared/PageHeader";
import { ConfidenceBadge } from "@/components/shared/ConfidenceBadge";
import { outcomeTrend, benchmarks } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import { useState } from "react";

const CHART = {
  c1: "hsl(var(--chart-1))",
  c2: "hsl(var(--chart-2))",
  c3: "hsl(var(--chart-3))",
  c4: "hsl(var(--chart-4))",
  c5: "hsl(var(--chart-5))",
  grid: "hsl(var(--chart-grid))",
  axis: "hsl(var(--chart-axis))",
};

export default function InvestorOutcomes() {
  const [showMethodology, setShowMethodology] = useState(false);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <PageHeader title="Program Outcomes" description="Clinical and operational outcomes data for the portfolio. All metrics include confidence labeling to indicate source methodology.">
        <Button variant="outline" size="sm" className="text-xs gap-1.5" onClick={() => setShowMethodology(!showMethodology)}>
          <Info className="h-3.5 w-3.5" /> Methodology
        </Button>
      </PageHeader>

      <div className="flex gap-4">
        <div className={showMethodology ? "flex-1 min-w-0" : "w-full"}>
          <div className="grid lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-sans-ui font-medium flex items-center gap-2">
                  Health Score Improvement <ConfidenceBadge level="validated" />
                </CardTitle>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">Jul 2025 – Mar 2026. Tracks changes in SF-12 health survey scores. A score above 70 indicates meaningful clinical improvement. Currently at 78.</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={outcomeTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke={CHART.grid} />
                    <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke={CHART.axis} />
                    <YAxis tick={{ fontSize: 11 }} stroke={CHART.axis} />
                    <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                    <Line type="monotone" dataKey="healthScore" stroke={CHART.c1} strokeWidth={2} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-sans-ui font-medium flex items-center gap-2">
                  Program Adherence <ConfidenceBadge level="validated" />
                </CardTitle>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">Jul 2025 – Mar 2026. Measures how consistently participants follow their prescribed nutrition plans. Target is 80%. Currently at 83% — above target.</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={outcomeTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke={CHART.grid} />
                    <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke={CHART.axis} />
                    <YAxis tick={{ fontSize: 11 }} stroke={CHART.axis} />
                    <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                    <Line type="monotone" dataKey="adherence" stroke={CHART.c2} strokeWidth={2} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-sans-ui font-medium flex items-center gap-2">
                  Food Security Gain <ConfidenceBadge level="proxy" />
                </CardTitle>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">Jul 2025 – Mar 2026. Estimated improvement in food security using USDA HFSSM indicators. This is a proxy metric derived from correlated program data.</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={outcomeTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke={CHART.grid} />
                    <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke={CHART.axis} />
                    <YAxis tick={{ fontSize: 11 }} stroke={CHART.axis} />
                    <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                    <Line type="monotone" dataKey="foodSecurity" stroke={CHART.c3} strokeWidth={2} dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-sans-ui font-medium">Benchmark Comparison</CardTitle>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">How Fresh House compares to industry averages and top 25% performers. "FH" = Fresh House results.</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={benchmarks.map(b => ({ name: b.metric.split(' ').slice(0,2).join(' '), FH: b.freshHouse, Industry: b.industryAvg, 'Top 25%': b.topQuartile }))}>
                    <CartesianGrid strokeDasharray="3 3" stroke={CHART.grid} />
                    <XAxis dataKey="name" tick={{ fontSize: 10 }} stroke={CHART.axis} />
                    <YAxis tick={{ fontSize: 11 }} stroke={CHART.axis} />
                    <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                    <Bar dataKey="Industry" fill={CHART.grid} radius={[2,2,0,0]} />
                    <Bar dataKey="Top 25%" fill={CHART.c5} radius={[2,2,0,0]} />
                    <Bar dataKey="FH" fill={CHART.c1} radius={[2,2,0,0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>

        {showMethodology && (
          <div className="w-80 shrink-0">
            <Card className="sticky top-6">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-sans-ui font-medium">Methodology</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div>
                  <h4 className="font-medium text-xs uppercase tracking-wider text-muted-foreground mb-1">Data Collection</h4>
                  <p className="text-muted-foreground leading-relaxed">Outcomes are collected through electronic health records integration, validated survey instruments (SF-12, USDA HFSSM), and program delivery logs.</p>
                </div>
                <div>
                  <h4 className="font-medium text-xs uppercase tracking-wider text-muted-foreground mb-1">Confidence Levels</h4>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2"><ConfidenceBadge level="validated" /><span className="text-muted-foreground text-xs">Verified through clinical records or validated instruments</span></div>
                    <div className="flex items-start gap-2"><ConfidenceBadge level="self-reported" /><span className="text-muted-foreground text-xs">Collected via beneficiary surveys</span></div>
                    <div className="flex items-start gap-2"><ConfidenceBadge level="proxy" /><span className="text-muted-foreground text-xs">Estimated from correlated indicators</span></div>
                    <div className="flex items-start gap-2"><ConfidenceBadge level="direct" /><span className="text-muted-foreground text-xs">Measured directly from program operations</span></div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-xs uppercase tracking-wider text-muted-foreground mb-1">Attribution</h4>
                  <p className="text-muted-foreground leading-relaxed">We use propensity score matching to compare enrolled participants with comparable non-participants, controlling for age, diagnosis, and socioeconomic factors.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
