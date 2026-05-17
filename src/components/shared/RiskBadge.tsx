import { cn } from "@/lib/utils";

const styles = {
  low: "bg-olive text-forest",
  medium: "bg-mist text-teal",
  high: "bg-destructive/10 text-destructive",
};

export function RiskBadge({ level }: { level: "low" | "medium" | "high" }) {
  return (
    <span className={cn("text-[10px] font-medium px-2 py-0.5 rounded-full", styles[level])}>
      {level} risk
    </span>
  );
}
