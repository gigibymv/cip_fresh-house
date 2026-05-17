import { PageHeader } from "@/components/shared/PageHeader";
import { funderFitScores, archetypeInfo, funders, pipeline, type FunderArchetype } from "@/data/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Presentation, ChevronDown, ChevronUp, CheckCircle2, AlertTriangle, Plus, Globe, Building2 } from "lucide-react";
import { useState } from "react";

const pitchStructures: Record<FunderArchetype, { slides: string[]; dataPoints: string[]; objections: string[] }> = {
  "health-payer": {
    slides: [
      "Total Cost of Care Impact — ER visits, hospitalizations avoided",
      "Clinical Outcomes — Adherence, health score improvement, A1C reduction",
      "Population Fit — Member overlap and eligibility analysis",
      "Cost-Effectiveness — Per-member-per-month savings model",
      "Scale Plan — Enrollment trajectory and geographic reach",
      "Partnership Model — Integration with care management workflows",
    ],
    dataPoints: [
      "40% reduction in ER visits for enrolled members",
      "Cost per outcome: $1,240 vs $1,890 industry average",
      "83% program adherence rate (vs 68% benchmark)",
      "2.3x better adherence than standard meal programs",
    ],
    objections: [
      "Cost per beneficiary above Medicaid benchmark — counter with total cost of care",
      "Attribution of outcomes — propensity score matching methodology",
      "Scale limitations — expansion roadmap with timelines",
    ],
  },
  foundation: {
    slides: [
      "Mission Alignment — Shared values and theory of change",
      "Human Impact — Beneficiary stories and qualitative outcomes",
      "Validated Outcomes — Key metrics with confidence levels",
      "Community Voice — Satisfaction data and feedback themes",
      "Sustainability Plan — Path beyond grant funding",
      "Learning Agenda — What we're studying and sharing",
    ],
    dataPoints: [
      "4.6/5.0 beneficiary satisfaction rating",
      "12,847 people served across 14 counties",
      "78% health score improvement from baseline",
      "83% of beneficiaries report improved food security",
    ],
    objections: [
      "Attribution clarity — controlled comparison methodology",
      "Long-term sustainability — diversified funding strategy",
      "Geographic focus — expansion plan to high-need areas",
    ],
  },
  government: {
    slides: [
      "Regulatory Alignment — TEFAP, CalAIM, OAA compliance",
      "Population Reach — Volume served, demographics, equity",
      "Geographic Coverage — County-level map and gaps",
      "Compliance & Reporting — Milestone tracking infrastructure",
      "Cost Efficiency — Per-unit costs and federal benchmarks",
      "Expansion Capacity — Operational readiness for scale",
    ],
    dataPoints: [
      "14 counties covered, 3 high-need counties in expansion plan",
      "12,847 individuals served this fiscal year",
      "91% compliance rate on reporting milestones",
      "Senior Food Security program: 90% milestone completion",
    ],
    objections: [
      "Coverage gaps in underserved counties — Phase 2 expansion plan",
      "Budget cycle alignment — multi-year planning approach",
      "Data sharing — existing MOUs and HIPAA compliance",
    ],
  },
  "health-system": {
    slides: [
      "Community Benefit — IRS reporting and CHNA alignment",
      "Clinical Integration — Referral pathways and EHR integration",
      "Readmission Impact — 30-day readmission data for participants",
      "Patient Experience — Satisfaction and care quality scores",
      "Operational Model — Meal prep, delivery, and clinical coordination",
      "Value Proposition — ROI for community health investment",
    ],
    dataPoints: [
      "Participants show 35% fewer 30-day readmissions",
      "4.6/5.0 patient satisfaction with nutrition support",
      "Referral-to-enrollment conversion: 78%",
      "Average 12-day reduction in recovery timeline",
    ],
    objections: [
      "Clinical evidence strength — quasi-experimental design available",
      "Integration complexity — proven EHR referral workflows",
      "Scale feasibility — kitchen capacity and logistics plan",
    ],
  },
};

interface ProspectEntry {
  name: string;
  type: string;
  status: "current" | "pipeline" | "new";
  archetype: FunderArchetype;
  programs: string[];
  website?: string;
  notes?: string;
}

// Combine current funders and pipeline prospects
const baseFunders: ProspectEntry[] = [
  ...funders.map((f) => ({
    name: f.name,
    type: f.type,
    status: "current" as const,
    archetype: (f.type === "Payer" ? "health-payer" : f.type === "Foundation" ? "foundation" : f.type === "Government" ? "government" : "health-system") as FunderArchetype,
    programs: f.programs,
  })),
  ...pipeline.map((p) => {
    const fit = funderFitScores.find((fs) => fs.funderName === p.name);
    return {
      name: p.name,
      type: fit?.archetype ? archetypeInfo[fit.archetype].label : "Prospect",
      status: "pipeline" as const,
      archetype: fit?.archetype || ("foundation" as FunderArchetype),
      programs: [] as string[],
    };
  }),
];

export default function PitchDecks() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [prospects, setProspects] = useState<ProspectEntry[]>(baseFunders);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Form state
  const [formName, setFormName] = useState("");
  const [formWebsite, setFormWebsite] = useState("");
  const [formArchetype, setFormArchetype] = useState<FunderArchetype>("foundation");
  const [formNotes, setFormNotes] = useState("");

  const handleAddProspect = () => {
    if (!formName.trim()) return;

    const newProspect: ProspectEntry = {
      name: formName.trim(),
      type: archetypeInfo[formArchetype].label,
      status: "new",
      archetype: formArchetype,
      programs: [],
      website: formWebsite.trim() || undefined,
      notes: formNotes.trim() || undefined,
    };

    setProspects((prev) => [newProspect, ...prev]);
    setExpanded(newProspect.name);
    setFormName("");
    setFormWebsite("");
    setFormArchetype("foundation");
    setFormNotes("");
    setDialogOpen(false);
  };

  const statusBadge = (status: string) => {
    if (status === "current") return <Badge variant="default" className="text-[10px]">Current Funder</Badge>;
    if (status === "new") return <Badge className="text-[10px] bg-teal text-primary-foreground">New Prospect</Badge>;
    return <Badge variant="secondary" className="text-[10px]">Pipeline</Badge>;
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      <div className="flex items-start justify-between gap-4">
        <PageHeader
          title="Pitch Preparation"
          description="Tailored pitch outlines for each funder, based on their archetype and what they care about."
        />
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="shrink-0 gap-2">
              <Plus className="h-4 w-4" /> Add Prospect
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Prospect</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="prospect-name">Company Name</Label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="prospect-name"
                    placeholder="e.g. Humana, Ford Foundation"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="pl-10"
                    maxLength={100}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="prospect-website">Website URL (optional)</Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="prospect-website"
                    placeholder="https://example.com"
                    value={formWebsite}
                    onChange={(e) => setFormWebsite(e.target.value)}
                    className="pl-10"
                    maxLength={255}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Funder Archetype</Label>
                <Select value={formArchetype} onValueChange={(v) => setFormArchetype(v as FunderArchetype)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="health-payer">Health Payer</SelectItem>
                    <SelectItem value="foundation">Foundation</SelectItem>
                    <SelectItem value="government">Government</SelectItem>
                    <SelectItem value="health-system">Health System</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-[11px] text-muted-foreground">
                  Determines the recommended pitch structure, data points, and objections.
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="prospect-notes">Notes (optional)</Label>
                <Textarea
                  id="prospect-notes"
                  placeholder="Key contacts, funding priorities, prior relationship..."
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  rows={3}
                  maxLength={500}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={handleAddProspect} disabled={!formName.trim()}>
                Add & Generate Pitch
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {prospects.map((funder) => {
          const info = archetypeInfo[funder.archetype];
          const structure = pitchStructures[funder.archetype];
          const isExpanded = expanded === funder.name;

          return (
            <Card key={funder.name} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-5">
                <button
                  onClick={() => setExpanded(isExpanded ? null : funder.name)}
                  className="w-full text-left"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Presentation className="h-5 w-5 text-teal shrink-0" />
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-semibold">{funder.name}</p>
                          {statusBadge(funder.status)}
                        </div>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="inline-flex items-center justify-center h-4 w-4 rounded bg-muted text-[8px] font-bold text-muted-foreground">{info.icon}</span>
                          <p className="text-xs text-muted-foreground">
                            {info.label} · {info.pitchFocus}
                          </p>
                        </div>
                        {funder.website && (
                          <p className="text-[11px] text-teal mt-0.5">{funder.website}</p>
                        )}
                      </div>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="h-5 w-5 text-muted-foreground shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-muted-foreground shrink-0" />
                    )}
                  </div>
                </button>

                {isExpanded && (
                  <div className="mt-5 space-y-4">
                    {/* Notes */}
                    {funder.notes && (
                      <div className="p-3 rounded-lg bg-mist/30 border border-mist/50">
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">Notes</p>
                        <p className="text-sm text-muted-foreground">{funder.notes}</p>
                      </div>
                    )}

                    {/* Recommended Slides */}
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                        Recommended Deck Structure
                      </p>
                      <div className="space-y-1.5">
                        {structure.slides.map((slide, i) => (
                          <div key={i} className="flex items-start gap-2 text-sm">
                            <span className="text-[11px] font-bold text-teal mt-0.5 shrink-0 w-5 text-right">{i + 1}.</span>
                            <span className="text-muted-foreground">{slide}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Key Data Points */}
                    <div className="p-3 rounded-lg bg-olive/30 border border-olive/50">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                        Key Data Points to Include
                      </p>
                      <div className="space-y-1.5">
                        {structure.dataPoints.map((dp, i) => (
                          <div key={i} className="flex items-start gap-2 text-sm">
                            <CheckCircle2 className="h-3.5 w-3.5 text-forest mt-0.5 shrink-0" />
                            <span className="text-muted-foreground">{dp}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Objections to Preempt */}
                    <div className="p-3 rounded-lg bg-destructive/5 border border-destructive/10">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                        Objections to Preempt
                      </p>
                      <div className="space-y-1.5">
                        {structure.objections.map((obj, i) => (
                          <div key={i} className="flex items-start gap-2 text-sm">
                            <AlertTriangle className="h-3.5 w-3.5 text-terracotta mt-0.5 shrink-0" />
                            <span className="text-muted-foreground">{obj}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
