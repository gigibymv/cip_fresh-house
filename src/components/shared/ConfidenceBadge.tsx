import { cn } from "@/lib/utils";

export type ConfidenceLevel = "validated" | "directional" | "proxy" | "self-reported" | "pending validation" | "direct";

const styles: Record<ConfidenceLevel, string> = {
  validated: "bg-forest/10 text-forest",
  direct: "bg-forest/10 text-forest", // Alias for backward compatibility with mockData
  directional: "bg-teal/10 text-teal",
  proxy: "bg-muted text-muted-foreground",
  "self-reported": "bg-sage/30 text-forest",
  "pending validation": "bg-terracotta/10 text-terracotta",
};

const labels: Record<ConfidenceLevel, string> = {
  validated: "Validated",
  direct: "Validated",
  directional: "Directional",
  proxy: "Proxy",
  "self-reported": "Self-reported",
  "pending validation": "Pending validation",
};

export function ConfidenceBadge({ level }: { level: ConfidenceLevel | string }) {
  const normalizedLevel = (level.toLowerCase() as ConfidenceLevel) || "proxy";
  const style = styles[normalizedLevel] || styles.proxy;
  const label = labels[normalizedLevel] || level;

  return (
    <span className={cn("text-[10px] font-medium px-2 py-0.5 rounded-sm inline-flex items-center tracking-wide", style)}>
      {label}
    </span>
  );
}
