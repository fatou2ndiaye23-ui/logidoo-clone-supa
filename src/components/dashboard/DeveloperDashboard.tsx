import { Card, CardContent } from "@/components/ui/card";
import { Bug, Mail, AlertTriangle } from "lucide-react";
import DashboardSidebar from "./DashboardSidebar";

interface DeveloperDashboardProps {
  userName: string;
  onLogout: () => void;
}

const DeveloperDashboard = ({ userName, onLogout }: DeveloperDashboardProps) => {
  return (
    <div className="flex min-h-screen bg-muted/30">
      <DashboardSidebar userRole="developer" onLogout={onLogout} />
      
      <main className="flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Tableau de bord Développeur</h1>
          <p className="text-muted-foreground">Bienvenue, {userName}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-red-500/10 rounded-lg">
                  <Bug className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-sm text-muted-foreground">Bugs actifs</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-500/10 rounded-lg">
                  <Mail className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-sm text-muted-foreground">Emails en attente</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-yellow-500/10 rounded-lg">
                  <AlertTriangle className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-sm text-muted-foreground">Erreurs système</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="pt-6">
            <h3 className="text-xl font-semibold mb-4">Gestion technique</h3>
            <p className="text-muted-foreground">
              Gestion des bugs, modification du site, gestion des emails, et résolution des erreurs système.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default DeveloperDashboard;
