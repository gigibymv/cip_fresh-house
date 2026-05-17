import { PageHeader } from "@/components/shared/PageHeader";
import { objections } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RiskBadge } from "@/components/shared/RiskBadge";
import { ShieldAlert, FileText, MessageSquare } from "lucide-react";

export default function ObjectionPrediction() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <PageHeader title="Objection Prediction" description="Predicted diligence objections per funder with evidence-linked responses." />

      <div className="space-y-4">
        {objections.map(o => (
          <Card key={o.id}>
            <CardContent className="pt-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3">
                  <ShieldAlert className="h-5 w-5 text-terracotta mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-sm">{o.objection}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{o.funder}</p>
                  </div>
                </div>
                <RiskBadge level={o.severity} />
              </div>

              <div className="grid lg:grid-cols-3 gap-4 ml-8">
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground mb-1">Rationale</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{o.rationale}</p>
                </div>
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground mb-1 flex items-center gap-1">
                    <MessageSquare className="h-3 w-3" /> Suggested Response
                  </p>
                  <p className="text-sm leading-relaxed">{o.suggestedAnswer}</p>
                </div>
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground mb-1 flex items-center gap-1">
                    <FileText className="h-3 w-3" /> Supporting Materials
                  </p>
                  <div className="space-y-1">
                    {o.materials.map(m => (
                      <div key={m} className="text-xs px-2 py-1 rounded bg-mist/50 border border-mist">{m}</div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
