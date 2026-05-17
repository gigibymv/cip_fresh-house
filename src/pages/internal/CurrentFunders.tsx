import { PageHeader } from "@/components/shared/PageHeader";
import { funders } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScoreBar } from "@/components/shared/ScoreBar";
import { RiskBadge } from "@/components/shared/RiskBadge";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { ArrowLeft, Calendar, User, Target, MessageSquare, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CurrentFunders() {
  const [selected, setSelected] = useState<typeof funders[0] | null>(null);

  if (selected) {
    return (
      <div className="max-w-5xl mx-auto space-y-6">
        <Button variant="ghost" size="sm" className="gap-1.5 mb-2" onClick={() => setSelected(null)}>
          <ArrowLeft className="h-3.5 w-3.5" /> Back to funders
        </Button>
        <PageHeader title={selected.name} description={`${selected.type} · Relationship owner: ${selected.owner}`} />

        <div className="grid md:grid-cols-3 gap-4">
          <Card><CardContent className="pt-5"><p className="text-xs text-muted-foreground">Check Size</p><p className="text-2xl font-semibold tabular-nums">${(selected.checkSize / 1000000).toFixed(1)}M</p></CardContent></Card>
          <Card><CardContent className="pt-5"><p className="text-xs text-muted-foreground">Renewal Score</p><p className="text-2xl font-semibold tabular-nums mb-2">{selected.renewalScore}</p><ScoreBar score={selected.renewalScore} /></CardContent></Card>
          <Card><CardContent className="pt-5"><p className="text-xs text-muted-foreground">Engagement</p><p className="text-2xl font-semibold capitalize">{selected.engagement}</p></CardContent></Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-base font-sans-ui font-medium">Programs Funded</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {selected.programs.map(p => (
                <div key={p} className="flex items-center gap-2 text-sm p-2 rounded bg-muted/30">
                  <Target className="h-4 w-4 text-forest" />{p}
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-base font-sans-ui font-medium">Key Risks</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {selected.risks.length === 0 ? <p className="text-sm text-muted-foreground">No significant risks identified.</p> :
                selected.risks.map(r => (
                  <div key={r} className="p-2 rounded bg-destructive/5 border border-destructive/10 text-sm">{r}</div>
                ))
              }
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-base font-sans-ui font-medium">Activity Timeline</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            {[
              { date: "Mar 15, 2026", event: "Dashboard viewed — Outcomes section", icon: Target },
              { date: "Mar 10, 2026", event: "Quarterly update email sent", icon: MessageSquare },
              { date: "Feb 28, 2026", event: "Mid-year impact assessment shared", icon: FileText },
              { date: "Feb 15, 2026", event: "Call with relationship manager", icon: User },
              { date: "Jan 30, 2026", event: "Renewal timeline confirmed", icon: Calendar },
            ].map((a, i) => (
              <div key={i} className="flex items-center gap-3 p-2 hover:bg-muted/30 rounded">
                <a.icon className="h-4 w-4 text-muted-foreground shrink-0" />
                <span className="flex-1">{a.event}</span>
                <span className="text-xs text-muted-foreground tabular-nums">{a.date}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <PageHeader title="Current Funders" description="Active funder relationships, engagement levels, and renewal status." />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {funders.map(f => (
          <Card key={f.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => setSelected(f)}>
            <CardContent className="pt-5 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-sm">{f.name}</p>
                  <p className="text-xs text-muted-foreground">{f.type} · {f.owner}</p>
                </div>
                <Badge variant={f.engagement === "high" ? "default" : "secondary"} className="text-[10px] capitalize">{f.engagement}</Badge>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div><span className="text-muted-foreground">Check size</span><p className="font-semibold tabular-nums">${(f.checkSize / 1000000).toFixed(1)}M</p></div>
                <div><span className="text-muted-foreground">Renewal</span><p className="font-semibold tabular-nums">{f.renewalDate}</p></div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1"><span className="text-muted-foreground">Renewal score</span><span className="font-medium">{f.renewalScore}</span></div>
                <ScoreBar score={f.renewalScore} />
              </div>
              {f.risks.length > 0 && (
                <div className="flex flex-wrap gap-1">{f.risks.map(r => <span key={r} className="text-[10px] px-2 py-0.5 rounded-full bg-destructive/10 text-destructive">{r}</span>)}</div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
