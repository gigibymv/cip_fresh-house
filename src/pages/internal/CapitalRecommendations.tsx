import { PageHeader } from "@/components/shared/PageHeader";
import { capitalRecommendations } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, ArrowRight } from "lucide-react";

const durabilityColor = (d: string) => d === "High" ? "default" as const : d === "Medium" ? "secondary" as const : "outline" as const;

export default function CapitalRecommendations() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <PageHeader title="Capital Recommendations" description="Recommended capital structures for each program based on evidence and market fit." />

      <div className="grid md:grid-cols-2 gap-4">
        {capitalRecommendations.map(r => (
          <Card key={r.id} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-5 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-sm">{r.program}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Lightbulb className="h-3.5 w-3.5 text-teal" />
                    <span className="text-xs font-medium text-teal">{r.source}</span>
                  </div>
                </div>
                <Badge variant={durabilityColor(r.durability)} className="text-[10px]">{r.durability} durability</Badge>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">{r.rationale}</p>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div><span className="text-muted-foreground">Evidence Required</span><p className="mt-0.5">{r.evidenceRequired}</p></div>
                <div><span className="text-muted-foreground">Buyer Type</span><p className="mt-0.5">{r.buyerType}</p></div>
              </div>

              {r.risk && (
                <div className="text-xs p-2 rounded bg-destructive/5 border border-destructive/10">
                  <span className="text-muted-foreground">Risk: </span>{r.risk}
                </div>
              )}

              <div className="flex items-center gap-1.5 text-xs font-medium text-forest cursor-pointer hover:underline">
                <ArrowRight className="h-3 w-3" /> {r.nextStep}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
