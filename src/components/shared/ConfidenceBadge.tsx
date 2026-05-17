import { cn } from "@/lib/utils";

type Confidence = "validated" | "self-reported" | "proxy" | "direct";

const styles: Record<Confidence, string> = {
  validated: "bg-olive text-forest",
  "self-reported": "bg-mist text-teal",
  proxy: "bg-muted text-muted-foreground",
  direct: "bg-olive text-forest",
};

export function ConfidenceBadge({ level }: { level: Confidence }) {
  return (
    <span className={cn("text-[10px] font-medium px-2 py-0.5 rounded-full inline-flex items-center", styles[level])}>
      {level}
    </span>
  );
}
