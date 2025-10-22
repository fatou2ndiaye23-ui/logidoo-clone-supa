import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Clock, Package, LogOut } from "lucide-react";
import DashboardSidebar from "./DashboardSidebar";

interface ClientDashboardProps {
  userName: string;
  onLogout: () => void;
}

const ClientDashboard = ({ userName, onLogout }: ClientDashboardProps) => {
  const [activeTab, setActiveTab] = useState("mes-devis");

  return (
    <div className="flex min-h-screen bg-muted/30">
      <DashboardSidebar userRole="client" onLogout={onLogout} />
      
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Tableau de bord client</h1>
          <p className="text-muted-foreground">Bienvenue, {userName}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-sm text-muted-foreground">Devis totaux</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-yellow-500/10 rounded-lg">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-sm text-muted-foreground">En attente</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-500/10 rounded-lg">
                  <Package className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-sm text-muted-foreground">Approuvés</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-card rounded-lg p-6">
          <div className="flex gap-4 mb-6 border-b">
            <button
              className={`pb-3 px-4 font-medium transition-colors ${
                activeTab === "mes-devis"
                  ? "border-b-2 border-primary text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => setActiveTab("mes-devis")}
            >
              Mes devis
            </button>
            <button
              className={`pb-3 px-4 font-medium transition-colors ${
                activeTab === "mon-profil"
                  ? "border-b-2 border-primary text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => setActiveTab("mon-profil")}
            >
              Mon profil
            </button>
          </div>

          {activeTab === "mes-devis" && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Mes demandes de devis</h3>
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-6">
                  Vous n'avez pas encore de demandes de devis.
                </p>
                <Button>Faire une demande</Button>
              </div>
            </div>
          )}

          {activeTab === "mon-profil" && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Mon profil</h3>
              <p className="text-muted-foreground">
                Nom: {userName}
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ClientDashboard;
