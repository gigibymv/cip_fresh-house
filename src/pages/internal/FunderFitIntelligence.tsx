import { PageHeader } from "@/components/shared/PageHeader";
import { funderFitScores, archetypeInfo, type FunderArchetype } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Compass, Info } from "lucide-react";

const fitLabel = (val: string) => val === "High" ? "default" as const : "secondary" as const;

const groupedByArchetype = (Object.keys(archetypeInfo) as FunderArchetype[]).map((key) => ({
  archetype: key,
  info: archetypeInfo[key],
  funders: funderFitScores
    .filter((f) => f.archetype === key)
    .sort((a, b) => b.fitScore - a.fitScore),
})).filter((g) => g.funders.length > 0);

export default function FunderFitIntelligence() {
  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      <PageHeader
        title="Funder-Program Fit Intelligence"
        description="Prospective funders grouped by archetype with tailored alignment scores."
      />

      {groupedByArchetype.map((group) => (
        <div key={group.archetype} className="space-y-4">
          {/* Archetype Header */}
          <Card className="bg-mist/30 border-mist">
            <CardContent className="pt-5 pb-4">
              <div className="flex items-start gap-3">
                <span className="inline-flex items-center justify-center h-8 w-8 rounded-lg bg-teal/10 text-xs font-bold text-teal">{group.info.icon}</span>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{group.info.label}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{group.info.motivation}</p>
                  <div className="grid sm:grid-cols-2 gap-3 mt-3">
                    <div className="p-2.5 rounded-md bg-card border">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">Evidence Needed</p>
                      <p className="text-sm text-foreground">{group.info.evidenceNeeded}</p>
                    </div>
                    <div className="p-2.5 rounded-md bg-card border">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">Pitch Focus</p>
                      <p className="text-sm text-foreground">{group.info.pitchFocus}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Funders in this archetype */}
          {group.funders.map((f) => (
            <Card key={f.id} className="hover:shadow-md transition-shadow ml-4">
              <CardContent className="pt-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Compass className="h-5 w-5 text-teal" />
                    <div>
                      <p className="font-medium">{f.funderName}</p>
                      <p className="text-xs text-muted-foreground">{f.priorComparables} prior comparable investments</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-semibold tabular-nums">{f.fitScore}</p>
                    <p className="text-[10px] text-muted-foreground">fit score</p>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-3 mb-3">
                  <div className="text-center"><p className="text-[10px] text-muted-foreground mb-1">Capital Fit</p><Badge variant={fitLabel(f.capitalFit)} className="text-[10px]">{f.capitalFit}</Badge></div>
                  <div className="text-center"><p className="text-[10px] text-muted-foreground mb-1">Geography</p><Badge variant={fitLabel(f.geoFit)} className="text-[10px]">{f.geoFit}</Badge></div>
                  <div className="text-center"><p className="text-[10px] text-muted-foreground mb-1">Check Size</p><Badge variant={fitLabel(f.checkSizeFit)} className="text-[10px]">{f.checkSizeFit}</Badge></div>
                  <div className="text-center"><p className="text-[10px] text-muted-foreground mb-1">Thesis</p><Badge variant={fitLabel(f.thesisFit)} className="text-[10px]">{f.thesisFit}</Badge></div>
                </div>

                <div className="p-3 rounded-md bg-mist/30 border border-mist text-sm">
                  <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground mb-1">Recommended Outreach</p>
                  <p className="text-muted-foreground">{f.outreachAngle}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ))}
    </div>
  );
}
