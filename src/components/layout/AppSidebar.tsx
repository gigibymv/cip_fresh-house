import {
  LayoutDashboard, BarChart3, Heart, RefreshCw, FolderOpen, MessageSquare,
  DollarSign, Users, Gauge, ShieldAlert, Compass, Kanban, Bot, ArrowLeftRight,
  Settings, HelpCircle, Presentation, LineChart, Sliders, BookOpen
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation, useNavigate } from "react-router-dom";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar,
} from "@/components/ui/sidebar";
import { CipLogo } from "@/components/shared/CipLogo";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const investorGroups = [
  {
    label: "Overview",
    items: [
      { title: "Dashboard", url: "/investor/overview", icon: LayoutDashboard },
    ],
  },
  {
    label: "Performance",
    items: [
      { title: "Program Outcomes", url: "/investor/outcomes", icon: BarChart3 },
      { title: "Programs", url: "/investor/programs", icon: BookOpen },
      { title: "Beneficiary Voice", url: "/investor/beneficiary-voice", icon: Heart },
      { title: "Benchmarks", url: "/investor/benchmarks", icon: LineChart },
    ],
  },
  {
    label: "Planning",
    items: [
      { title: "Renewal Readiness", url: "/investor/renewal-readiness", icon: RefreshCw },
      { title: "Scenario Planning", url: "/investor/scenario-planning", icon: Sliders },
    ],
  },
  {
    label: "Resources",
    items: [
      { title: "Data Room", url: "/investor/data-room", icon: FolderOpen },
      { title: "Ask the Data", url: "/investor/ask-the-data", icon: MessageSquare },
    ],
  },
];

const internalGroups = [
  {
    label: "Overview",
    items: [
      { title: "Dashboard", url: "/internal/capital-overview", icon: DollarSign },
    ],
  },
  {
    label: "Funder Management",
    items: [
      { title: "Our Funders", url: "/internal/current-funders", icon: Users },
      { title: "Renewal Risk", url: "/internal/renewal-scoring", icon: Gauge },
      { title: "Anticipate Objections", url: "/internal/objection-prediction", icon: ShieldAlert },
    ],
  },
  {
    label: "Prospecting",
    items: [
      { title: "Find Best-Fit Funders", url: "/internal/funder-fit", icon: Compass },
      { title: "Funding Pipeline", url: "/internal/pipeline", icon: Kanban },
      { title: "Pitch Preparation", url: "/internal/pitch-decks", icon: Presentation },
    ],
  },
  {
    label: "Tools",
    items: [
      { title: "Capital Recommendations", url: "/internal/capital-recommendations", icon: LineChart },
      { title: "Materials", url: "/internal/materials", icon: BookOpen },
      { title: "AI Assistant", url: "/internal/ai-copilot", icon: Bot },
    ],
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const navigate = useNavigate();

  const isInvestor = location.pathname.startsWith("/investor");

  const renderItem = (item: { title: string; url: string; icon: any }) => {
    const isActive = location.pathname === item.url;
    return (
      <SidebarMenuItem key={item.url}>
        <SidebarMenuButton asChild isActive={isActive}>
          <NavLink
            to={item.url}
            end
            className={cn(
              "relative flex items-center gap-3 px-4 py-2.5 rounded-xl text-[15px] transition-colors",
              isActive
                ? "bg-forest/8 text-foreground font-semibold"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
            )}
            activeClassName=""
          >
            {isActive && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-forest" />
            )}
            <item.icon className={cn("h-5 w-5 shrink-0", isActive ? "text-forest" : "")} />
            {!collapsed && <span>{item.title}</span>}
          </NavLink>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  };

  return (
    <Sidebar collapsible="icon" className="border-r-0 bg-card">
      <SidebarContent className="pt-5 px-2">
        {/* Logo */}
        {!collapsed && (
          <div className="px-4 pb-6">
            <CipLogo />
          </div>
        )}

        {isInvestor ? (
          investorGroups.map((group) => (
            <SidebarGroup key={group.label} className="mb-1">
              {!collapsed && (
                <SidebarGroupLabel className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground font-semibold px-4 mb-1">
                  {group.label}
                </SidebarGroupLabel>
              )}
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map(renderItem)}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))
        ) : (
          internalGroups.map((group) => (
            <SidebarGroup key={group.label} className="mb-1">
              {!collapsed && (
                <SidebarGroupLabel className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground font-semibold px-4 mb-1">
                  {group.label}
                </SidebarGroupLabel>
              )}
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map(renderItem)}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))
        )}

        {/* General group */}
        {!collapsed && (
          <SidebarGroup className="mt-6">
            <SidebarGroupLabel className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground font-semibold px-4 mb-2">
              General
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-[15px] text-muted-foreground/50 cursor-default">
                          <Settings className="h-5 w-5 shrink-0" />
                          <span>Settings</span>
                        </span>
                      </TooltipTrigger>
                      <TooltipContent side="right">Coming soon</TooltipContent>
                    </Tooltip>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-[15px] text-muted-foreground/50 cursor-default">
                          <HelpCircle className="h-5 w-5 shrink-0" />
                          <span>Help</span>
                        </span>
                      </TooltipTrigger>
                      <TooltipContent side="right">Coming soon</TooltipContent>
                    </Tooltip>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <button
                      onClick={() => navigate("/")}
                      className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-[15px] text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors w-full"
                    >
                      <ArrowLeftRight className="h-5 w-5 shrink-0" />
                      <span>Switch Portal</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
