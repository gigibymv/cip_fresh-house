import { useNavigate } from "react-router-dom";
import { BarChart3, DollarSign, ArrowRight } from "lucide-react";
import freshHouseLogo from "@/assets/fresh-house-logo.png";

const portals = [
  {
    title: "Investor Portal",
    subtitle: "For funders and partners",
    description: "Track how your funded programs are performing. View outcomes, beneficiary feedback, and renewal readiness in real time.",
    icon: BarChart3,
    path: "/investor/overview",
    features: ["Program outcomes", "Beneficiary stories", "Renewal status", "AI powered Q&A"],
    accent: "bg-forest",
  },
  {
    title: "Grupo Navis Workspace",
    subtitle: "For your internal team",
    description: "Manage capital strategy, strengthen funder relationships, and prepare for upcoming renewals with AI powered insights.",
    icon: DollarSign,
    path: "/internal/capital-overview",
    features: ["Capital dashboard", "Funder intelligence", "Pipeline management", "Risk scoring"],
    accent: "bg-charcoal",
  },
];

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 md:p-12">
      <div className="max-w-4xl w-full space-y-16">
        {/* Header */}
        <div className="text-center space-y-4">
          <img src={freshHouseLogo} alt="Fresh House" className="h-14 w-auto mx-auto" />
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground"><h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">Capital Intelligence Platform</h1></h1>
            <p className="text-muted-foreground mt-2 text-base max-w-lg mx-auto">
              Track impact, manage renewals, and make data-driven decisions — for nonprofits and their funders.
            </p>
          </div>
        </div>

        {/* Portal Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {portals.map((p) => (
            <button
              key={p.path}
              onClick={() => navigate(p.path)}
              className="group rounded-2xl bg-card border border-border p-8 text-left space-y-6 hover:shadow-xl hover:border-forest/30 hover:-translate-y-1 transition-all duration-300"
            >
              {/* Icon + badge */}
              <div className="flex items-center gap-3">
                <div className={`h-12 w-12 rounded-2xl ${p.accent} flex items-center justify-center`}>
                  <p.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">{p.title}</h2>
                  <p className="text-xs text-muted-foreground">{p.subtitle}</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                {p.description}
              </p>

              {/* Features */}
              <div className="grid grid-cols-2 gap-2">
                {p.features.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-xs text-foreground/70">
                    <div className="h-1.5 w-1.5 rounded-full bg-forest shrink-0" />
                    {f}
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="flex items-center gap-2 text-sm font-semibold text-forest group-hover:gap-3 transition-all pt-2">
                Open workspace <ArrowRight className="h-4 w-4" />
              </div>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            Powered by Fresh House · Capital Intelligence Platform v1.0
          </p>
        </div>
      </div>
    </div>
  );
}
