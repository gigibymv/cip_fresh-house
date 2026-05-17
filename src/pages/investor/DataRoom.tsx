import { PageHeader } from "@/components/shared/PageHeader";
import { dataRoomDocuments } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FileText, Table2, File } from "lucide-react";
import { Button } from "@/components/ui/button";

const iconMap: Record<string, React.ElementType> = { PDF: FileText, XLSX: Table2 };
const categories = [...new Set(dataRoomDocuments.map(d => d.category))];

export default function DataRoom() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <PageHeader title="Data Room" description="Structured access to impact reports, methodology, financials, and supporting materials." />

      {categories.map((cat) => (
        <div key={cat}>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">{cat}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
            {dataRoomDocuments.filter(d => d.category === cat).map((doc) => {
              const Icon = iconMap[doc.type] || File;
              return (
                <Card key={doc.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-4 pb-4 flex items-start gap-3">
                    <div className="h-10 w-10 rounded-md bg-mist/50 flex items-center justify-center shrink-0">
                      <Icon className="h-5 w-5 text-teal" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{doc.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{doc.type} · {doc.size} · {doc.date}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                      <Download className="h-3.5 w-3.5" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
