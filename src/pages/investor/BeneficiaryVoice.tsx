import { PageHeader } from "@/components/shared/PageHeader";
import { beneficiaryMetrics, beneficiaryQuotes } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Heart, Star, Truck, Globe, TrendingUp, TrendingDown, Minus, MessageCircle, Clock, Users, Smartphone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import whatsappMockup from "@/assets/whatsapp-mockup.png";

const CHART = {
  c1: "hsl(var(--chart-1))",
  c3: "hsl(var(--chart-3))",
  grid: "hsl(var(--chart-grid))",
  axis: "hsl(var(--chart-axis))",
};

const channelData = [
  { name: "WhatsApp", value: beneficiaryMetrics.channelBreakdown.whatsapp, color: "hsl(var(--forest))" },
  { name: "SMS", value: beneficiaryMetrics.channelBreakdown.sms, color: "hsl(var(--teal))" },
  { name: "Phone", value: beneficiaryMetrics.channelBreakdown.phone, color: "hsl(var(--chart-3))" },
  { name: "In-Person", value: beneficiaryMetrics.channelBreakdown.inPerson, color: "hsl(var(--muted-foreground))" },
];

const metricCards = [
  { label: "Satisfaction", value: beneficiaryMetrics.satisfaction, icon: Star, suffix: "/ 5.0" },
  { label: "Meal Quality", value: beneficiaryMetrics.mealQuality, icon: Heart, suffix: "/ 5.0" },
  { label: "Delivery Experience", value: beneficiaryMetrics.deliveryExperience, icon: Truck, suffix: "/ 5.0" },
  { label: "Cultural Relevance", value: beneficiaryMetrics.culturalRelevance, icon: Globe, suffix: "/ 5.0" },
  { label: "Adherence", value: beneficiaryMetrics.adherence, icon: TrendingUp, suffix: "%" },
  { label: "Usefulness", value: beneficiaryMetrics.usefulness, icon: Star, suffix: "/ 5.0" },
];

export default function BeneficiaryVoice() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <PageHeader
        title="Beneficiary Voice"
        description="Qualitative and quantitative beneficiary feedback, aggregated from post-intervention surveys across distribution channels."
        badge={<Badge variant="secondary" className="text-xs tabular-nums">{beneficiaryMetrics.totalResponses} responses this quarter</Badge>}
      />

      {/* How It Works — WhatsApp highlight */}
      <Card className="border-forest/20 bg-forest/[0.03]">
        <CardContent className="pt-6 pb-5">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* WhatsApp Mockup */}
            <div className="w-full lg:w-52 shrink-0 flex justify-center">
              <img
                src={whatsappMockup}
                alt="WhatsApp survey interaction with a beneficiary after meal delivery"
                className="w-44 rounded-2xl shadow-lg"
                loading="lazy"
                width={768}
                height={1376}
              />
            </div>
            {/* Text + Stats */}
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-forest/10 flex items-center justify-center">
                  <MessageCircle className="h-4 w-4 text-forest" />
                </div>
                <h3 className="text-sm font-bold text-foreground">How We Listen</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                After each meal delivery, recipients receive a short, structured survey via <span className="font-semibold text-foreground">WhatsApp</span> — the channel most accessible to our population. Feedback covers meal quality, service experience, and overall satisfaction, giving funders a <span className="font-semibold text-foreground">human and immediate view of impact</span> that complements quantitative outcomes.
              </p>
              <div className="flex flex-wrap gap-4 pt-1">
                <div className="flex items-center gap-2 text-xs">
                  <Smartphone className="h-3.5 w-3.5 text-forest" />
                  <span className="text-muted-foreground"><span className="font-semibold text-foreground">{beneficiaryMetrics.whatsappActive}</span> active WhatsApp respondents</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <Clock className="h-3.5 w-3.5 text-forest" />
                  <span className="text-muted-foreground">Avg response in <span className="font-semibold text-foreground">{beneficiaryMetrics.avgResponseTime}</span></span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <Users className="h-3.5 w-3.5 text-forest" />
                  <span className="text-muted-foreground"><span className="font-semibold text-foreground">{beneficiaryMetrics.responseRate}%</span> response rate</span>
                </div>
              </div>
              {/* Channel breakdown inline */}
              <div className="pt-2 flex items-center gap-4">
                <div className="w-24 h-24 shrink-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={channelData} dataKey="value" cx="50%" cy="50%" innerRadius={20} outerRadius={36} paddingAngle={3} strokeWidth={0}>
                        {channelData.map((entry, i) => (
                          <Cell key={i} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(v: number) => [`${v}%`, ""]} contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-wrap gap-x-3 gap-y-1">
                  {channelData.map((c) => (
                    <div key={c.name} className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                      <div className="h-2 w-2 rounded-full" style={{ backgroundColor: c.color }} />
                      {c.name} ({c.value}%)
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {metricCards.map((m) => (
          <Card key={m.label}>
            <CardContent className="pt-4 pb-4 text-center">
              <m.icon className="h-4 w-4 mx-auto mb-2 text-chart-3" />
              <p className="text-xs text-muted-foreground mb-1">{m.label}</p>
              <p className="text-xl font-semibold tabular-nums">{m.value}<span className="text-xs text-muted-foreground ml-1">{m.suffix}</span></p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-sans-ui font-medium">Sentiment Trend</CardTitle>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">How participants feel about the program over time. Green = positive, gray = neutral, orange = negative feedback.</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={beneficiaryMetrics.sentimentTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke={CHART.grid} />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke={CHART.axis} />
                <YAxis tick={{ fontSize: 11 }} stroke={CHART.axis} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                <Area type="monotone" dataKey="positive" stackId="1" stroke={CHART.c1} fill="hsl(var(--chart-1) / 0.6)" />
                <Area type="monotone" dataKey="neutral" stackId="1" stroke={CHART.grid} fill="hsl(var(--chart-grid) / 0.6)" />
                <Area type="monotone" dataKey="negative" stackId="1" stroke={CHART.c3} fill="hsl(var(--chart-3) / 0.6)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-sans-ui font-medium">Recurring Issues</CardTitle>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">Most frequently reported concerns from beneficiary surveys. A downward arrow means the issue is improving.</p>
          </CardHeader>
          <CardContent className="space-y-3">
            {beneficiaryMetrics.recurringIssues.map((issue) => (
              <div key={issue.issue} className="flex items-center justify-between text-sm">
                <span>{issue.issue}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs tabular-nums text-muted-foreground">{issue.frequency} reports</span>
                  {issue.trend === "improving" ? <TrendingDown className="h-3.5 w-3.5 text-status-success" /> : <Minus className="h-3.5 w-3.5 text-muted-foreground" />}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Testimonials */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-sans-ui font-medium">Selected Testimonials</CardTitle>
          <p className="text-xs text-muted-foreground mt-1">Real quotes from program participants, collected via WhatsApp post-delivery surveys.</p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {beneficiaryQuotes.map((q) => (
              <div key={q.id} className="p-4 rounded-lg bg-background border">
                <div className="flex items-center gap-1.5 mb-2">
                  <MessageCircle className="h-3 w-3 text-forest/60" />
                  <span className="text-[10px] text-muted-foreground font-medium">via WhatsApp</span>
                </div>
                <p className="italic text-sm leading-relaxed text-foreground/80">"{q.text}"</p>
                <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                  <span>— {q.author}</span>
                  <span>{q.program} · {q.region}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
