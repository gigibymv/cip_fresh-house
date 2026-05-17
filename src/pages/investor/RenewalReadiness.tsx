import { PageHeader } from "@/components/shared/PageHeader";
import { renewalMilestones } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock, Circle, AlertTriangle, FileText, ArrowRight, CalendarClock, ShieldCheck } from "lucide-react";
import { ScoreBar } from "@/components/shared/ScoreBar";
import { Badge } from "@/components/ui/badge";
import { TrustStrip } from "@/components/shared/TrustStrip";

export default function RenewalReadiness() {
  const complete = renewalMilestones.filter(m => m.status === "complete").length;
  const total = renewalMilestones.length;

  const renewalDate = new Date("2026-09-30");
  const now = new Date();
  const monthsRemaining = Math.max(0, Math.round((renewalDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24 * 30)));

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <PageHeader
        title="Renewal Readiness"
        description="See whether your funded programs have the evidence, milestones, and risk controls needed for renewal."
      />

      <div className="flex items-center gap-4 p-4 rounded-2xl bg-forest/5 border border-forest/10">
        <div className="h-11 w-11 rounded-xl bg-forest/10 flex items-center justify-center shrink-0">
          <CalendarClock className="h-5 w-5 text-forest" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-foreground">Target Date: September 2026</p>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-forest opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-forest"></span>
            </span>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">On Track</p>
          </div>
        </div>
        <Badge variant="secondary" className="text-sm font-semibold tabular-nums shrink-0">
          {monthsRemaining} months remaining
        </Badge>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        <Card className="col-span-1 md:col-span-2">
          <CardContent className="pt-5">
            <div className="flex justify-between items-start mb-1">
              <p className="text-sm font-medium text-foreground">Overall Readiness</p>
              <Badge variant="outline" className="text-[10px] bg-status-success-muted text-status-success border-transparent">Ready for Expansion</Badge>
            </div>
            <p className="text-4xl font-semibold tabular-nums mb-4 text-forest">88%</p>
            <ScoreBar score={88} />
            <TrustStrip 
              source="Platform Aggregation" 
              updated="Today" 
              confidence="validated" 
              methodologyText="Weighted average of clinical evidence (40%), operational milestones (30%), and financial compliance (30%)." 
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-5">
            <p className="text-sm font-medium text-foreground mb-1">Evidence Quality</p>
            <p className="text-3xl font-semibold tabular-nums text-forest mt-2 mb-2">Strong</p>
            <p className="text-xs text-muted-foreground mt-1">
              All core metrics validated by third-party claims data.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-5">
            <p className="text-sm font-medium text-foreground mb-1">Milestones Completed</p>
            <p className="text-3xl font-semibold tabular-nums text-forest mt-2 mb-2">{complete}/{total}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {total - complete} remaining before deadline.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-sans-ui font-semibold flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-status-warning" /> 
                Open Risks & Attention Areas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-4 rounded-xl bg-status-warning-muted/50 border border-status-warning/20 flex gap-4">
                <div className="mt-0.5"><AlertTriangle className="h-4 w-4 text-status-warning" /></div>
                <div>
                  <p className="font-medium text-sm text-foreground">Financial reconciliation pending</p>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    The Q1 2026 financial true-up requires final billing data from the payer partner. This is a standard delay but blocks the final ROI calculation.
                  </p>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-status-info-muted/50 border border-status-info/20 flex gap-4">
                <div className="mt-0.5"><ShieldCheck className="h-4 w-4 text-status-info" /></div>
                <div>
                  <p className="font-medium text-sm text-foreground">12-month longitudinal data gap</p>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    Current outcomes rely on 6-month data. The 12-month longitudinal tracking design is implemented and early results are expected Q2.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-sans-ui font-semibold">Milestone Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {renewalMilestones.map((m) => (
                  <div key={m.id} className="flex items-center justify-between border-b border-border/50 pb-3 last:border-0 last:pb-0">
                    <div className="flex items-center gap-3 text-sm">
                      {m.status === "complete" ? <CheckCircle className="h-4 w-4 text-status-success" /> :
                      m.status === "in-progress" ? <Clock className="h-4 w-4 text-chart-2" /> :
                      <Circle className="h-4 w-4 text-muted-foreground" />}
                      <span className={m.status === "complete" ? "text-muted-foreground font-medium" : "text-foreground font-semibold"}>
                        {m.name}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground tabular-nums bg-muted px-2 py-1 rounded-md">{m.date}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-forest/5 border-forest/10 shadow-none">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-sans-ui font-semibold text-forest">Next Renewal Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="group cursor-pointer p-3 rounded-lg bg-card border border-border hover:border-forest/30 transition-colors">
                <p className="text-sm font-semibold text-foreground group-hover:text-forest transition-colors">Review Q1 Financials</p>
                <div className="flex justify-between items-center mt-2">
                  <Badge variant="secondary" className="text-[10px] bg-status-danger-muted text-status-danger">High Priority</Badge>
                  <ArrowRight className="h-3 w-3 text-muted-foreground group-hover:text-forest" />
                </div>
              </div>
              <div className="group cursor-pointer p-3 rounded-lg bg-card border border-border hover:border-forest/30 transition-colors">
                <p className="text-sm font-semibold text-foreground group-hover:text-forest transition-colors">Draft Interim Data Brief</p>
                <div className="flex justify-between items-center mt-2">
                  <Badge variant="secondary" className="text-[10px] bg-status-warning-muted text-status-warning">Medium Priority</Badge>
                  <ArrowRight className="h-3 w-3 text-muted-foreground group-hover:text-forest" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-sans-ui font-semibold flex items-center gap-2">
                <FileText className="h-4 w-4" /> Required Documents
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              {[
                { name: "2025 Annual Impact Report", status: "Ready" },
                { name: "Q4 Milestone Report", status: "Ready" },
                { name: "Methodology & Data Sources", status: "Ready" },
                { name: "Financial Reconciliation", status: "Draft" }
              ].map((doc) => (
                <div key={doc.name} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors group">
                  <span className="text-sm text-foreground/80 group-hover:text-foreground font-medium">{doc.name}</span>
                  <Badge variant="outline" className={`text-[10px] border-transparent ${doc.status === "Ready" ? "bg-status-success-muted text-status-success" : "bg-muted text-muted-foreground"}`}>
                    {doc.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
