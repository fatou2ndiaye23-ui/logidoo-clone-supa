import { Card, CardContent } from "@/components/ui/card";
import { Users, FileText, TrendingUp } from "lucide-react";
import DashboardSidebar from "./DashboardSidebar";

interface AdminDashboardProps {
  userName: string;
  onLogout: () => void;
}

const AdminDashboard = ({ userName, onLogout }: AdminDashboardProps) => {
  return (
    <div className="flex min-h-screen bg-muted/30">
      <DashboardSidebar userRole="admin" onLogout={onLogout} />
      
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Tableau de bord Admin</h1>
          <p className="text-muted-foreground">Bienvenue, {userName}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-sm text-muted-foreground">Utilisateurs totaux</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-500/10 rounded-lg">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-sm text-muted-foreground">Devis en cours</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-500/10 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">0%</p>
                  <p className="text-sm text-muted-foreground">Croissance</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="pt-6">
            <h3 className="text-xl font-semibold mb-4">Gestion de la plateforme</h3>
            <p className="text-muted-foreground">
              Visualisation globale du site, gestion des utilisateurs, et contrôle complet de la plateforme.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminDashboard;
