import { PageHeader } from "@/components/shared/PageHeader";
import { programs } from "@/data/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function InvestorPrograms() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <PageHeader title="Programs" description="Active and pilot programs funded through your portfolio." />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {programs.map((p) => (
          <Card key={p.id} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-5 space-y-3">
              <div className="flex items-start justify-between">
                <h3 className="font-medium text-sm">{p.name}</h3>
                <Badge variant={p.status === "active" ? "default" : "secondary"} className="text-[10px]">{p.status}</Badge>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div><span className="text-muted-foreground">People served</span><p className="font-semibold tabular-nums">{p.peopleServed.toLocaleString()}</p></div>
                <div><span className="text-muted-foreground">Budget</span><p className="font-semibold tabular-nums">${(p.budget / 1000000).toFixed(1)}M</p></div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Milestone progress</span>
                  <span className="font-medium tabular-nums">{p.milestoneProgress}%</span>
                </div>
                <Progress value={p.milestoneProgress} className="h-1.5" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
