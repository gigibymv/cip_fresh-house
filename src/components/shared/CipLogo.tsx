import { cn } from "@/lib/utils";
import cipLogoImage from "@/assets/cip-logo.png";

export function CipLogo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <img 
        src={cipLogoImage} 
        alt="CIP - Capital Intelligence Platform by Fresh House" 
        className="h-14 w-auto object-contain" 
      />
    </div>
  );
}
