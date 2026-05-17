import { PageHeader } from "@/components/shared/PageHeader";
import { dataRoomDocuments } from "@/data/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Table2, File, Download, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const iconMap: Record<string, React.ElementType> = { PDF: FileText, XLSX: Table2 };

export default function Materials() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <PageHeader title="Materials & Data Room Automation" description="Generate, manage, and automate investor-facing materials.">
        <Button size="sm" className="gap-1.5 text-xs"><Sparkles className="h-3.5 w-3.5" /> Auto-Generate</Button>
      </PageHeader>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {dataRoomDocuments.map(doc => {
          const Icon = iconMap[doc.type] || File;
          return (
            <Card key={doc.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-4 pb-4 flex items-start gap-3">
                <div className="h-10 w-10 rounded-md bg-mist/50 flex items-center justify-center shrink-0">
                  <Icon className="h-5 w-5 text-teal" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{doc.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{doc.category} · {doc.type} · {doc.size}</p>
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
  );
}
