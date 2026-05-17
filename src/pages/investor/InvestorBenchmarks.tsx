import { PageHeader } from "@/components/shared/PageHeader";
import { benchmarks } from "@/data/mockData";
import { ConfidenceBadge } from "@/components/shared/ConfidenceBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, ArrowDown, Minus } from "lucide-react";

function formatValue(metric: string, value: number) {
  if (metric === "Cost per Outcome") return `$${value.toLocaleString()}`;
  if (metric === "Beneficiary Satisfaction") return `${value} / 5.0`;
  return `${value}%`;
}

function ComparisonIndicator({ metric, freshHouse, comparison }: { metric: string; freshHouse: number; comparison: number }) {
  const isCost = metric === "Cost per Outcome";
  const better = isCost ? freshHouse < comparison : freshHouse > comparison;
  const equal = freshHouse === comparison;

  if (equal) return <Minus className="h-3.5 w-3.5 text-muted-foreground" />;
  return better
    ? <ArrowUp className="h-3.5 w-3.5 text-emerald-600" />
    : <ArrowDown className="h-3.5 w-3.5 text-destructive" />;
}

export default function InvestorBenchmarks() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <PageHeader title="Benchmarks" description="How Fresh House programs compare to industry standards and top performers." />

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-sans-ui font-medium">Performance vs. Benchmarks</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[240px]">Metric</TableHead>
                <TableHead className="text-center">Industry Avg</TableHead>
                <TableHead className="text-center">Top 25%</TableHead>
                <TableHead className="text-center">Fresh House</TableHead>
                <TableHead className="text-center w-[100px]">vs. Industry</TableHead>
                <TableHead className="text-right">Confidence</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {benchmarks.map((b) => {
                const isCost = b.metric === "Cost per Outcome";
                const beatsIndustry = isCost ? b.freshHouse < b.industryAvg : b.freshHouse > b.industryAvg;
                const beatsTop = isCost ? b.freshHouse <= b.topQuartile : b.freshHouse >= b.topQuartile;

                return (
                  <TableRow key={b.metric}>
                    <TableCell className="font-medium text-sm">{b.metric}</TableCell>
                    <TableCell className="text-center text-sm text-muted-foreground tabular-nums">
                      {formatValue(b.metric, b.industryAvg)}
                    </TableCell>
                    <TableCell className="text-center text-sm text-muted-foreground tabular-nums">
                      {formatValue(b.metric, b.topQuartile)}
                    </TableCell>
                    <TableCell className="text-center tabular-nums">
                      <span className={`text-sm font-semibold ${beatsTop ? "text-emerald-700" : beatsIndustry ? "text-foreground" : "text-destructive"}`}>
                        {formatValue(b.metric, b.freshHouse)}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <ComparisonIndicator metric={b.metric} freshHouse={b.freshHouse} comparison={b.industryAvg} />
                        <Badge variant={beatsIndustry ? "default" : "destructive"} className="text-[10px] px-1.5 py-0">
                          {beatsIndustry ? "Above" : "Below"}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <ConfidenceBadge level={b.confidence} />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
