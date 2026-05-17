import { PageHeader } from "@/components/shared/PageHeader";
import { pipeline } from "@/data/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { RiskBadge } from "@/components/shared/RiskBadge";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle, Circle, Calendar } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const stages = ["Discovery", "Proposal", "LOI", "Negotiation", "Closed"];

export default function Pipeline() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <PageHeader title="Pipeline" description="Prospective funders across stages with fit scores and next actions." />

      <Tabs defaultValue="kanban">
        <TabsList>
          <TabsTrigger value="kanban">Board</TabsTrigger>
          <TabsTrigger value="table">Table</TabsTrigger>
        </TabsList>

        <TabsContent value="kanban" className="mt-4">
          <div className="overflow-x-auto -mx-2 px-2 pb-2">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 min-w-[600px]">
              {stages.filter(s => pipeline.some(p => p.stage === s)).map(stage => (
                <div key={stage}>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">{stage}</h3>
                  <div className="space-y-3">
                    {pipeline.filter(p => p.stage === stage).map(p => (
                      <Card key={p.id}>
                        <CardContent className="pt-4 pb-4 space-y-2">
                          <div className="flex items-start justify-between">
                            <p className="font-medium text-sm">{p.name}</p>
                            <RiskBadge level={p.objectionRisk} />
                          </div>
                          <div className="grid grid-cols-2 gap-1 text-xs">
                            <div><span className="text-muted-foreground">Fit</span><p className="font-semibold tabular-nums">{p.fitScore}</p></div>
                            <div><span className="text-muted-foreground">Amount</span><p className="font-semibold tabular-nums">${(p.amount/1000000).toFixed(1)}M</p></div>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground">{p.owner}</span>
                            <div className="flex items-center gap-1">
                              {p.materialsReady ? <CheckCircle className="h-3 w-3 text-forest" /> : <Circle className="h-3 w-3 text-muted-foreground" />}
                              <span className="text-muted-foreground">{p.materialsReady ? "Ready" : "Pending"}</span>
                            </div>
                          </div>
                          {p.nextMeeting && (
                            <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                              <Calendar className="h-3 w-3" /> {p.nextMeeting}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="table" className="mt-4">
          <Card>
            <CardContent className="pt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Funder</TableHead>
                    <TableHead>Stage</TableHead>
                    <TableHead className="text-right">Fit</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead>Next Meeting</TableHead>
                    <TableHead>Risk</TableHead>
                    <TableHead>Materials</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pipeline.map(p => (
                    <TableRow key={p.id}>
                      <TableCell className="font-medium">{p.name}</TableCell>
                      <TableCell><Badge variant="secondary" className="text-[10px]">{p.stage}</Badge></TableCell>
                      <TableCell className="text-right tabular-nums font-semibold">{p.fitScore}</TableCell>
                      <TableCell className="text-right tabular-nums">${(p.amount/1000000).toFixed(1)}M</TableCell>
                      <TableCell>{p.owner}</TableCell>
                      <TableCell className="tabular-nums">{p.nextMeeting || "—"}</TableCell>
                      <TableCell><RiskBadge level={p.objectionRisk} /></TableCell>
                      <TableCell>{p.materialsReady ? <CheckCircle className="h-4 w-4 text-forest" /> : <Circle className="h-4 w-4 text-muted-foreground" />}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
