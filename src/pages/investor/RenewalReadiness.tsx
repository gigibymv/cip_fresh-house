import { PageHeader } from "@/components/shared/PageHeader";
import { renewalMilestones } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock, Circle, AlertTriangle, FileText, ArrowRight, CalendarClock } from "lucide-react";
import { ScoreBar } from "@/components/shared/ScoreBar";
import { Badge } from "@/components/ui/badge";

export default function RenewalReadiness() {
  const complete = renewalMilestones.filter(m => m.status === "complete").length;
  const total = renewalMilestones.length;

  // Calculate months remaining
  const renewalDate = new Date("2026-09-30");
  const now = new Date();
  const monthsRemaining = Math.max(0, Math.round((renewalDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24 * 30)));

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <PageHeader
        title="Renewal Readiness"
        description="Assessment of preparation for your upcoming funding renewal cycle."
      />

      {/* Renewal Date Banner */}
      <div className="flex items-center gap-4 p-4 rounded-2xl bg-forest/5 border border-forest/10">
        <div className="h-11 w-11 rounded-xl bg-forest/10 flex items-center justify-center shrink-0">
          <CalendarClock className="h-5 w-5 text-forest" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-foreground">Renewal Date: September 2026</p>
          <p className="text-xs text-muted-foreground mt-0.5">A readiness score above 80% indicates strong alignment with renewal requirements.</p>
        </div>
        <Badge variant="secondary" className="text-sm font-semibold tabular-nums shrink-0">
          {monthsRemaining} months remaining
        </Badge>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-5">
            <p className="text-sm text-muted-foreground mb-1">Overall Readiness</p>
            <p className="text-3xl font-semibold tabular-nums mb-3">82%</p>
            <ScoreBar score={82} />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5">
            <p className="text-sm text-muted-foreground mb-1">Milestones Achieved</p>
            <p className="text-3xl font-semibold tabular-nums">{complete}/{total}</p>
            <p className="text-xs text-muted-foreground mt-1">{total - complete} remaining before renewal deadline</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5">
            <p className="text-sm text-muted-foreground mb-1">Evidence Quality</p>
            <p className="text-3xl font-semibold tabular-nums">4/5</p>
            <p className="text-xs text-muted-foreground mt-1">
              <Badge variant="secondary" className="text-[10px] mr-1">Strong</Badge>
              Core metrics validated
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-sans-ui font-medium">Milestone Timeline</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {renewalMilestones.map((m) => (
              <div key={m.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm">
                  {m.status === "complete" ? <CheckCircle className="h-4 w-4 text-status-success" /> :
                   m.status === "in-progress" ? <Clock className="h-4 w-4 text-chart-2" /> :
                   <Circle className="h-4 w-4 text-muted-foreground" />}
                  <span className={m.status === "complete" ? "text-muted-foreground" : ""}>{m.name}</span>
                </div>
                <span className="text-xs text-muted-foreground tabular-nums">{m.date}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-sans-ui font-medium flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-status-danger" /> Open Risks
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="p-3 rounded-md bg-status-danger-muted border border-status-danger/10">
                <p className="font-medium">Financial reconciliation pending</p>
                <p className="text-xs text-muted-foreground mt-1">Expected completion: April 15, 2026</p>
              </div>
              <div className="p-3 rounded-md bg-status-info-muted border border-status-info">
                <p className="font-medium">12-month longitudinal data gap</p>
                <p className="text-xs text-muted-foreground mt-1">Tracking design implemented; early results available Q2</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-sans-ui font-medium flex items-center gap-2">
                <FileText className="h-4 w-4" /> Supporting Documents
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              {["2025 Annual Impact Report", "Q4 Milestone Report", "Methodology & Data Sources"].map((doc) => (
                <div key={doc} className="flex items-center justify-between p-2 rounded hover:bg-muted/50 cursor-pointer">
                  <span>{doc}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-sans-ui font-medium">Suggested Next Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-3 text-sm">
            <div className="p-3 rounded-md bg-status-warning-muted border border-status-warning/20">
              <p className="font-medium">Complete financial reconciliation</p>
              <p className="text-xs text-muted-foreground mt-1">Priority: High — Due April 15</p>
            </div>
            <div className="p-3 rounded-md bg-status-info-muted border border-status-info/30">
              <p className="font-medium">Schedule renewal presentation</p>
              <p className="text-xs text-muted-foreground mt-1">Priority: Medium — Target May 1</p>
            </div>
            <div className="p-3 rounded-md bg-status-info-muted border border-status-info/30">
              <p className="font-medium">Prepare 12-month interim data brief</p>
              <p className="text-xs text-muted-foreground mt-1">Priority: Medium — Target April 20</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
