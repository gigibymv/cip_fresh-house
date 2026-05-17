import { cn } from "@/lib/utils";

export function ScoreBar({ score, className }: { score: number; className?: string }) {
  const color = score >= 80 ? "bg-forest" : score >= 60 ? "bg-teal" : "bg-terracotta";
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
        <div className={cn("h-full rounded-full transition-all", color)} style={{ width: `${score}%` }} />
      </div>
      <span className="text-sm font-medium tabular-nums w-8 text-right">{score}</span>
    </div>
  );
}
