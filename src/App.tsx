import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import SuivreColis from "./pages/SuivreColis";
import DemandeDevis from "./pages/DemandeDevis";
import Outils from "./pages/Outils";
import Produits from "./pages/Produits";
import Entreprise from "./pages/Entreprise";
import PortailDeveloppeur from "./pages/PortailDeveloppeur";
import ServiceCommercial from "./pages/ServiceCommercial";
import NotFound from "./pages/NotFound";
import UserManagement from "./pages/admin/UserManagement";
import QuoteManagement from "./pages/admin/QuoteManagement";
import Configuration from "./pages/admin/Configuration";
import BugManagement from "./pages/developer/BugManagement";
import EmailManagement from "./pages/developer/EmailManagement";
import SystemErrors from "./pages/developer/SystemErrors";
import SystemConfiguration from "./pages/developer/SystemConfiguration";
import Commandes from "./pages/client/Commandes";
import Livraisons from "./pages/client/Livraisons";
import Boutiques from "./pages/client/Boutiques";
import Debours from "./pages/client/Debours";
import Entrepots from "./pages/client/Entrepots";
import Zones from "./pages/client/Zones";
import Catalogues from "./pages/client/Catalogues";
import Reclamations from "./pages/client/Reclamations";
import Loads from "./pages/client/Loads";
import Promotions from "./pages/client/Promotions";
import MesDevis from "./pages/client/MesDevis";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/suivre-colis" element={<SuivreColis />} />
          <Route path="/demande-devis" element={<DemandeDevis />} />
          <Route path="/outils" element={<Outils />} />
          <Route path="/produits" element={<Produits />} />
          <Route path="/entreprise" element={<Entreprise />} />
          <Route path="/portail-developpeur" element={<PortailDeveloppeur />} />
          <Route path="/service-commercial" element={<ServiceCommercial />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/quotes" element={<QuoteManagement />} />
          <Route path="/admin/configuration" element={<Configuration />} />
          <Route path="/developer/bugs" element={<BugManagement />} />
          <Route path="/developer/emails" element={<EmailManagement />} />
          <Route path="/developer/errors" element={<SystemErrors />} />
          <Route path="/developer/system-config" element={<SystemConfiguration />} />
          <Route path="/client/commandes" element={<Commandes />} />
          <Route path="/client/livraisons" element={<Livraisons />} />
          <Route path="/client/boutiques" element={<Boutiques />} />
          <Route path="/client/debours" element={<Debours />} />
          <Route path="/client/entrepots" element={<Entrepots />} />
          <Route path="/client/zones" element={<Zones />} />
          <Route path="/client/catalogues" element={<Catalogues />} />
          <Route path="/client/reclamations" element={<Reclamations />} />
          <Route path="/client/loads" element={<Loads />} />
          <Route path="/client/promotions" element={<Promotions />} />
          <Route path="/client/mes-devis" element={<MesDevis />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
