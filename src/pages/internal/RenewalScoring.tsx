import { PageHeader } from "@/components/shared/PageHeader";
import { funders } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScoreBar } from "@/components/shared/ScoreBar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const sorted = [...funders].sort((a, b) => b.renewalScore - a.renewalScore);

export default function RenewalScoring() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <PageHeader title="Renewal Scoring" description="Funders ranked by renewal probability with key risk signals." />

      <div className="grid md:grid-cols-3 gap-3">
        {sorted.slice(0, 3).map(f => (
          <Card key={f.id}>
            <CardContent className="pt-5 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-sm">{f.name}</p>
                  <p className="text-xs text-muted-foreground">{f.type}</p>
                </div>
                <span className="text-2xl font-semibold tabular-nums">{f.renewalScore}</span>
              </div>
              <ScoreBar score={f.renewalScore} />
              <div className="text-xs space-y-1">
                <div className="flex justify-between"><span className="text-muted-foreground">Engagement</span><span className="capitalize font-medium">{f.engagement}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Renewal</span><span className="tabular-nums">{f.renewalDate}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Check</span><span className="tabular-nums">${(f.checkSize/1000000).toFixed(1)}M</span></div>
              </div>
              {f.risks.length > 0 && (
                <div className="flex flex-wrap gap-1">{f.risks.map(r => <Badge key={r} variant="destructive" className="text-[10px]">{r}</Badge>)}</div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="pt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Funder</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Engagement</TableHead>
                <TableHead className="text-right">Score</TableHead>
                <TableHead>Renewal Date</TableHead>
                <TableHead>Risks</TableHead>
                <TableHead>Suggested Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sorted.map(f => (
                <TableRow key={f.id}>
                  <TableCell className="font-medium">{f.name}</TableCell>
                  <TableCell>{f.type}</TableCell>
                  <TableCell className="capitalize">{f.engagement}</TableCell>
                  <TableCell className="text-right tabular-nums font-semibold">{f.renewalScore}</TableCell>
                  <TableCell className="tabular-nums">{f.renewalDate}</TableCell>
                  <TableCell>{f.risks.length > 0 ? f.risks.join(", ") : "—"}</TableCell>
                  <TableCell className="text-xs">{f.renewalScore < 70 ? "Schedule engagement call" : f.renewalScore < 85 ? "Monitor closely" : "Maintain cadence"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
