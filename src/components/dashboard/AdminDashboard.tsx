import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, FileText, TrendingUp } from "lucide-react";
import DashboardSidebar from "./DashboardSidebar";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface AdminDashboardProps {
  userName: string;
  onLogout: () => void;
}

const AdminDashboard = ({ userName, onLogout }: AdminDashboardProps) => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    pendingQuotes: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data: profiles } = await supabase.from("profiles").select("id");
      const { data: quotes } = await supabase
        .from("quotes")
        .select("id")
        .eq("status", "pending");

      setStats({
        totalUsers: profiles?.length || 0,
        pendingQuotes: quotes?.length || 0
      });
    } catch (error) {
      console.error("Erreur lors du chargement des statistiques", error);
    }
  };

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
                  <p className="text-2xl font-bold">{stats.totalUsers}</p>
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
                  <p className="text-2xl font-bold">{stats.pendingQuotes}</p>
                  <p className="text-sm text-muted-foreground">Devis en attente</p>
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

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Gestion des utilisateurs</h3>
              <p className="text-muted-foreground mb-4">
                Consultez et gérez tous les utilisateurs de la plateforme.
              </p>
              <Button asChild>
                <Link to="/admin/users">Voir les utilisateurs</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Gestion des devis</h3>
              <p className="text-muted-foreground mb-4">
                Approuvez ou rejetez les demandes de devis des clients.
              </p>
              <Button asChild>
                <Link to="/admin/quotes">Voir les devis</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
