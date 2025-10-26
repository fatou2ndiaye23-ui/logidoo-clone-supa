import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bug, Mail, AlertTriangle } from "lucide-react";
import DashboardSidebar from "./DashboardSidebar";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface DeveloperDashboardProps {
  userName: string;
  onLogout: () => void;
}

const DeveloperDashboard = ({ userName, onLogout }: DeveloperDashboardProps) => {
  const [stats, setStats] = useState({
    activeBugs: 0,
    unresolvedErrors: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { count: bugsCount } = await supabase
        .from("bugs")
        .select("*", { count: "exact", head: true })
        .neq("status", "resolved");

      const { count: errorsCount } = await supabase
        .from("system_errors")
        .select("*", { count: "exact", head: true })
        .eq("status", "unresolved");

      setStats({
        activeBugs: bugsCount || 0,
        unresolvedErrors: errorsCount || 0,
      });
    } catch (error) {
      console.error("Erreur lors du chargement des stats:", error);
    }
  };

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
                  <p className="text-2xl font-bold">{stats.activeBugs}</p>
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
                  <p className="text-2xl font-bold">-</p>
                  <p className="text-sm text-muted-foreground">Gestion des utilisateurs</p>
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
                  <p className="text-2xl font-bold">{stats.unresolvedErrors}</p>
                  <p className="text-sm text-muted-foreground">Erreurs système</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Gestion des bugs</h3>
              <p className="text-muted-foreground mb-4">
                Suivez et résolvez les bugs signalés par les utilisateurs.
              </p>
              <Button asChild>
                <Link to="/developer/bugs">Voir les bugs</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Gestion des utilisateurs</h3>
              <p className="text-muted-foreground mb-4">
                Réinitialiser les mots de passe et gérer les accès utilisateurs.
              </p>
              <Button asChild>
                <Link to="/developer/emails">Gérer les utilisateurs</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Erreurs système</h3>
              <p className="text-muted-foreground mb-4">
                Consultez les logs d'erreurs et les problèmes techniques.
              </p>
              <Button asChild>
                <Link to="/developer/errors">Voir les erreurs</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Configuration système</h3>
              <p className="text-muted-foreground mb-4">
                Statistiques, maintenance et configuration avancée du système.
              </p>
              <Button asChild variant="outline">
                <Link to="/developer/system-config">Configuration avancée</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default DeveloperDashboard;
