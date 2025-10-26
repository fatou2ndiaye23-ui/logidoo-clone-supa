import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

const SystemConfiguration = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBugs: 0,
    totalErrors: 0,
    totalQuotes: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSystemStats();
  }, []);

  const fetchSystemStats = async () => {
    try {
      // Compter les utilisateurs
      const { count: usersCount } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true });

      // Compter les bugs
      const { count: bugsCount } = await supabase
        .from("bugs")
        .select("*", { count: "exact", head: true });

      // Compter les erreurs système
      const { count: errorsCount } = await supabase
        .from("system_errors")
        .select("*", { count: "exact", head: true })
        .eq("status", "unresolved");

      // Compter les devis
      const { count: quotesCount } = await supabase
        .from("quotes")
        .select("*", { count: "exact", head: true });

      setStats({
        totalUsers: usersCount || 0,
        totalBugs: bugsCount || 0,
        totalErrors: errorsCount || 0,
        totalQuotes: quotesCount || 0,
      });
    } catch (error) {
      console.error("Erreur:", error);
      toast.error("Erreur lors du chargement des statistiques");
    } finally {
      setLoading(false);
    }
  };

  const clearResolvedBugs = async () => {
    try {
      const { error } = await supabase
        .from("bugs")
        .delete()
        .eq("status", "resolved");

      if (error) throw error;
      toast.success("Bugs résolus supprimés");
      fetchSystemStats();
    } catch (error) {
      console.error("Erreur:", error);
      toast.error("Erreur lors de la suppression");
    }
  };

  const clearResolvedErrors = async () => {
    try {
      const { error } = await supabase
        .from("system_errors")
        .delete()
        .eq("status", "resolved");

      if (error) throw error;
      toast.success("Erreurs résolues supprimées");
      fetchSystemStats();
    } catch (error) {
      console.error("Erreur:", error);
      toast.error("Erreur lors de la suppression");
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 p-8">
      <div className="mb-6">
        <Link to="/dashboard">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour au tableau de bord
          </Button>
        </Link>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Statistiques système</CardTitle>
            <CardDescription>Vue d'ensemble de l'état du système</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-muted-foreground">Chargement...</p>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Utilisateurs totaux</p>
                  <p className="text-2xl font-bold">{stats.totalUsers}</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Bugs actifs</p>
                  <p className="text-2xl font-bold">{stats.totalBugs}</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Erreurs non résolues</p>
                  <p className="text-2xl font-bold">{stats.totalErrors}</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Devis totaux</p>
                  <p className="text-2xl font-bold">{stats.totalQuotes}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Maintenance de la base de données</CardTitle>
            <CardDescription>Outils de nettoyage et d'optimisation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Nettoyer les bugs résolus</p>
                <p className="text-sm text-muted-foreground">
                  Supprime tous les bugs marqués comme résolus
                </p>
              </div>
              <Button variant="outline" onClick={clearResolvedBugs}>
                Nettoyer
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Nettoyer les erreurs résolues</p>
                <p className="text-sm text-muted-foreground">
                  Supprime toutes les erreurs système résolues
                </p>
              </div>
              <Button variant="outline" onClick={clearResolvedErrors}>
                Nettoyer
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Informations système</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Base de données</span>
              <Badge variant="secondary">Lovable Cloud</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">État</span>
              <Badge>Opérationnel</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Version</span>
              <span>1.0.0</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SystemConfiguration;
