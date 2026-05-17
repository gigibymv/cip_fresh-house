import { PageHeader } from "@/components/shared/PageHeader";
import { scenarios } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { Users, MapPin, Target, CheckCircle } from "lucide-react";
import { KpiCard } from "@/components/shared/KpiCard";

export default function ScenarioPlanning() {
  const [fundingLevel, setFundingLevel] = useState([8500000]);

  const getScenario = () => {
    const f = fundingLevel[0];
    if (f >= 10000000) return scenarios[1];
    if (f >= 7000000) return scenarios[0];
    return scenarios[2];
  };

  const active = getScenario();
  const projected = {
    people: Math.round(active.peopleServed * (fundingLevel[0] / active.funding)),
    counties: Math.round(active.counties * (fundingLevel[0] / active.funding)),
    programs: Math.max(4, Math.round(active.programs * (fundingLevel[0] / active.funding))),
    milestones: Math.min(95, Math.round(active.milestoneCompletion * (fundingLevel[0] / active.funding))),
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <PageHeader title="Scenario Planning" description="Model clinical and operational outcomes based on projected capital allocation." />

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium">Funding Level</p>
            <p className="text-2xl font-semibold tabular-nums">${(fundingLevel[0] / 1000000).toFixed(1)}M</p>
          </div>
          <Slider value={fundingLevel} onValueChange={setFundingLevel} min={4000000} max={15000000} step={500000} className="mb-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>$4M</span><span>$15M</span>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard title="People Served" value={projected.people.toLocaleString()} icon={Users} />
        <KpiCard title="Counties" value={projected.counties} icon={MapPin} />
        <KpiCard title="Programs" value={projected.programs} icon={Target} />
        <KpiCard title="Milestone Completion" value={`${projected.milestones}%`} icon={CheckCircle} />
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {scenarios.map((s) => (
          <Card key={s.id} className={active.id === s.id ? "ring-2 ring-primary" : ""}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-sans-ui font-medium">{s.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p className="text-muted-foreground text-xs">{s.description}</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div><span className="text-muted-foreground">Funding</span><p className="font-semibold tabular-nums">${(s.funding / 1000000).toFixed(1)}M</p></div>
                <div><span className="text-muted-foreground">People</span><p className="font-semibold tabular-nums">{s.peopleServed.toLocaleString()}</p></div>
                <div><span className="text-muted-foreground">Counties</span><p className="font-semibold tabular-nums">{s.counties}</p></div>
                <div><span className="text-muted-foreground">Programs</span><p className="font-semibold tabular-nums">{s.programs}</p></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
