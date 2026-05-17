import { SidebarTrigger } from "@/components/ui/sidebar";
import { useLocation } from "react-router-dom";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Bell, Mail } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function TopBar() {
  const location = useLocation();
  const isInvestor = location.pathname.startsWith("/investor");

  const user = isInvestor
    ? { name: "Blue Shield Foundation", email: "investor@blueshield.org", initials: "BS" }
    : { name: "Grupo Navis", email: "admin@gruponavis.org", initials: "GN" };

  return (
    <header className="h-16 bg-card flex items-center px-6 gap-4 shrink-0">
      <SidebarTrigger />

      {/* Search */}
      <Tooltip>
        <TooltipTrigger asChild>
          <button className="relative hidden md:flex items-center gap-2 flex-1 max-w-md h-10 px-3 text-sm bg-background border border-border rounded-xl text-muted-foreground cursor-default">
            <Search className="h-4 w-4" />
            <span>Search...</span>
            <kbd className="ml-auto text-[10px] bg-muted border border-border rounded-md px-2 py-0.5 font-mono">⌘ F</kbd>
          </button>
        </TooltipTrigger>
        <TooltipContent>Coming soon</TooltipContent>
      </Tooltip>

      <div className="ml-auto flex items-center gap-2">
        {/* Mail */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="h-10 w-10 rounded-full border border-border flex items-center justify-center hover:bg-muted/40 text-muted-foreground transition-colors">
              <Mail className="h-4 w-4" />
            </button>
          </TooltipTrigger>
          <TooltipContent>Coming soon</TooltipContent>
        </Tooltip>
        {/* Bell */}
        <Tooltip>
          <TooltipTrigger asChild>
            <button className="h-10 w-10 rounded-full border border-border flex items-center justify-center hover:bg-muted/40 text-muted-foreground transition-colors">
              <Bell className="h-4 w-4" />
            </button>
          </TooltipTrigger>
          <TooltipContent>Coming soon</TooltipContent>
        </Tooltip>
        {/* User */}
        <div className="flex items-center gap-3 ml-2">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="text-sm bg-forest text-primary-foreground font-bold">{user.initials}</AvatarFallback>
          </Avatar>
          <div className="hidden sm:block">
            <p className="text-sm font-bold text-foreground leading-tight">{user.name}</p>
            <p className="text-xs text-muted-foreground leading-tight">{user.email}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
