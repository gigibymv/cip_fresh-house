import { ConfidenceBadge, ConfidenceLevel } from "./ConfidenceBadge";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface TrustStripProps {
  source: string;
  updated: string;
  sample?: string;
  confidence: ConfidenceLevel;
  methodologyText?: string;
}

export function TrustStrip({ source, updated, sample, confidence, methodologyText }: TrustStripProps) {
  return (
    <div className="mt-4 pt-3 border-t border-border flex flex-wrap items-center justify-between gap-3 text-[11px] text-muted-foreground">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <div className="flex items-center gap-1.5">
          <span className="font-medium text-foreground/70">Source:</span>
          <span>{source}</span>
        </div>
        
        <div className="flex items-center gap-1.5">
          <span className="font-medium text-foreground/70">Updated:</span>
          <span>{updated}</span>
        </div>

        {sample && (
          <div className="flex items-center gap-1.5">
            <span className="font-medium text-foreground/70">Sample:</span>
            <span>{sample}</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          <span className="font-medium text-foreground/70">Confidence:</span>
          <ConfidenceBadge level={confidence} />
        </div>
        
        {methodologyText && (
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="flex items-center gap-1 text-teal hover:text-teal/80 transition-colors">
                <Info className="h-3.5 w-3.5" />
                <span className="underline underline-offset-2">Methodology</span>
              </button>
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-xs text-xs">
              {methodologyText}
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </div>
  );
}
