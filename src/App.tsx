import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppLayout } from "@/components/layout/AppLayout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

import InvestorOverview from "./pages/investor/InvestorOverview";
import InvestorPrograms from "./pages/investor/InvestorPrograms";
import InvestorOutcomes from "./pages/investor/InvestorOutcomes";
import BeneficiaryVoice from "./pages/investor/BeneficiaryVoice";
import InvestorBenchmarks from "./pages/investor/InvestorBenchmarks";
import RenewalReadiness from "./pages/investor/RenewalReadiness";
import ScenarioPlanning from "./pages/investor/ScenarioPlanning";
import DataRoom from "./pages/investor/DataRoom";
import AiChat from "./pages/investor/AiChat";

import CapitalOverview from "./pages/internal/CapitalOverview";
import CurrentFunders from "./pages/internal/CurrentFunders";
import RenewalScoring from "./pages/internal/RenewalScoring";
import ObjectionPrediction from "./pages/internal/ObjectionPrediction";
import FunderFitIntelligence from "./pages/internal/FunderFitIntelligence";
import CapitalRecommendations from "./pages/internal/CapitalRecommendations";
import Pipeline from "./pages/internal/Pipeline";
import Materials from "./pages/internal/Materials";
import AiCopilot from "./pages/internal/AiCopilot";
import PitchDecks from "./pages/internal/PitchDecks";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route element={<AppLayout><Routes><Route path="*" element={null} /></Routes></AppLayout>}>
          </Route>
          <Route path="/investor/overview" element={<AppLayout><InvestorOverview /></AppLayout>} />
          <Route path="/investor/programs" element={<AppLayout><InvestorPrograms /></AppLayout>} />
          <Route path="/investor/outcomes" element={<AppLayout><InvestorOutcomes /></AppLayout>} />
          <Route path="/investor/beneficiary-voice" element={<AppLayout><BeneficiaryVoice /></AppLayout>} />
          <Route path="/investor/benchmarks" element={<AppLayout><InvestorBenchmarks /></AppLayout>} />
          <Route path="/investor/renewal-readiness" element={<AppLayout><RenewalReadiness /></AppLayout>} />
          <Route path="/investor/scenario-planning" element={<AppLayout><ScenarioPlanning /></AppLayout>} />
          <Route path="/investor/data-room" element={<AppLayout><DataRoom /></AppLayout>} />
          <Route path="/investor/ai-chat" element={<AppLayout><AiChat /></AppLayout>} />
          <Route path="/internal/capital-overview" element={<AppLayout><CapitalOverview /></AppLayout>} />
          <Route path="/internal/current-funders" element={<AppLayout><CurrentFunders /></AppLayout>} />
          <Route path="/internal/renewal-scoring" element={<AppLayout><RenewalScoring /></AppLayout>} />
          <Route path="/internal/objection-prediction" element={<AppLayout><ObjectionPrediction /></AppLayout>} />
          <Route path="/internal/funder-fit" element={<AppLayout><FunderFitIntelligence /></AppLayout>} />
          <Route path="/internal/capital-recommendations" element={<AppLayout><CapitalRecommendations /></AppLayout>} />
          <Route path="/internal/pitch-decks" element={<AppLayout><PitchDecks /></AppLayout>} />
          <Route path="/internal/pipeline" element={<AppLayout><Pipeline /></AppLayout>} />
          <Route path="/internal/materials" element={<AppLayout><Materials /></AppLayout>} />
          <Route path="/internal/ai-copilot" element={<AppLayout><AiCopilot /></AppLayout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
