import { cn } from "@/lib/utils";
import { ArrowUpRight, LucideIcon } from "lucide-react";

interface KpiCardProps {
  title: string;
  value: string | number;
  change?: number;
  period?: string;
  highlighted?: boolean;
  subtitle?: string;
  description?: string;
  icon?: LucideIcon;
  className?: string;
}

export function KpiCard({ title, value, change, period, highlighted, subtitle, description, icon: Icon, className }: KpiCardProps) {
  const rounded = change !== undefined ? Math.round(change * 10) / 10 : undefined;
  const isPositive = rounded === undefined || rounded >= 0;

  return (
    <div className={cn(
      "rounded-2xl p-7 relative flex flex-col justify-between min-h-[170px]",
      highlighted
        ? "bg-gradient-to-br from-chart-1 to-chart-2 text-primary-foreground shadow-md"
        : "bg-[hsl(var(--kpi-muted))]",
      className
    )}>
      {/* Title row with arrow or icon */}
      <div className="flex items-center justify-between">
        <div>
          <p className={cn(
            "text-sm font-medium",
            highlighted ? "text-primary-foreground/80" : "text-muted-foreground"
          )}>{title}</p>
          {description && (
            <p className={cn(
              "text-[11px] leading-snug mt-0.5",
              highlighted ? "text-primary-foreground/50" : "text-muted-foreground/70"
            )}>{description}</p>
          )}
        </div>
        <div className={cn(
          "h-8 w-8 rounded-full flex items-center justify-center border",
          highlighted
            ? "border-primary-foreground/20 bg-primary-foreground/10"
            : "border-border/60"
        )}>
          {Icon ? (
            <Icon className={cn(
              "h-3.5 w-3.5",
              highlighted ? "text-primary-foreground" : "text-foreground/60"
            )} />
          ) : (
            <ArrowUpRight className={cn(
              "h-3.5 w-3.5",
              highlighted ? "text-primary-foreground" : "text-foreground/60"
            )} />
          )}
        </div>
      </div>

      {/* Value */}
      <p className={cn(
        "text-3xl lg:text-4xl font-extrabold tabular-nums tracking-[-0.02em] mt-2",
        highlighted ? "text-primary-foreground" : "text-foreground"
      )}>
        {typeof value === 'number' ? value.toLocaleString() : value}
      </p>

      {/* Trend badge */}
      <div className="mt-3">
        {rounded !== undefined ? (
          <span className={cn(
            "inline-flex items-center gap-1.5 text-sm font-medium px-2.5 py-1 rounded-full",
            highlighted
              ? "bg-primary-foreground/15 text-primary-foreground/90"
              : isPositive
                ? "bg-status-success-muted text-status-success"
                : "bg-status-danger-muted text-status-danger"
          )}>
            <span className={cn(
              "inline-flex items-center justify-center h-4 w-4 rounded-full text-[9px] font-bold",
              highlighted
                ? "bg-primary-foreground/20 text-primary-foreground"
                : isPositive ? "bg-status-success/20 text-status-success" : "bg-status-danger/20 text-status-danger"
            )}>
              {Math.abs(rounded)}
            </span>
            {isPositive ? "Increased from last month" : "Decreased from last month"}
          </span>
        ) : subtitle ? (
          <span className={cn(
            "text-sm",
            highlighted ? "text-primary-foreground/60" : "text-muted-foreground"
          )}>{subtitle}</span>
        ) : period ? (
          <span className={cn(
            "text-sm",
            highlighted ? "text-primary-foreground/60" : "text-muted-foreground"
          )}>{period}</span>
        ) : null}
      </div>
    </div>
  );
}
