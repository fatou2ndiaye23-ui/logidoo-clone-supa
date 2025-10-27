import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Clock, Package } from "lucide-react";
import DashboardSidebar from "./DashboardSidebar";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface ClientDashboardProps {
  userName: string;
  onLogout: () => void;
}

interface Quote {
  id: string;
  departure_location: string;
  destination_location: string;
  transport_type: string;
  transport_mode: string;
  shipment_date: string;
  status: string;
  created_at: string;
}

const ClientDashboard = ({ userName, onLogout }: ClientDashboardProps) => {
  const [activeTab, setActiveTab] = useState("mes-devis");
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0
  });

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("quotes")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;

      const quotesData = data || [];
      setQuotes(quotesData);

      setStats({
        total: quotesData.length,
        pending: quotesData.filter(q => q.status === "pending").length,
        approved: quotesData.filter(q => q.status === "approved").length
      });
    } catch (error) {
      console.error("Erreur lors du chargement des devis", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "approved":
        return "default";
      case "pending":
        return "secondary";
      case "rejected":
        return "destructive";
      default:
        return "secondary";
    }
  };

  return (
    <div className="flex min-h-screen bg-muted/30">
      <DashboardSidebar userRole="client" onLogout={onLogout} />
      
      <main className="flex-1 p-4 md:p-8 lg:ml-0">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Tableau de bord client</h1>
          <p className="text-muted-foreground">Bienvenue, {userName}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stats.total}</p>
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
                  <p className="text-2xl font-bold">{stats.pending}</p>
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
                  <p className="text-2xl font-bold">{stats.approved}</p>
                  <p className="text-sm text-muted-foreground">Approuvés</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-card rounded-lg p-4 md:p-6">
          <div className="flex gap-4 mb-6 border-b overflow-x-auto">
            <button
              className={`pb-3 px-4 font-medium transition-colors whitespace-nowrap ${
                activeTab === "mes-devis"
                  ? "border-b-2 border-primary text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => setActiveTab("mes-devis")}
            >
              Mes devis
            </button>
            <button
              className={`pb-3 px-4 font-medium transition-colors whitespace-nowrap ${
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
              {loading ? (
                <p>Chargement...</p>
              ) : quotes.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-6">
                    Vous n'avez pas encore de demandes de devis.
                  </p>
                  <Button asChild>
                    <Link to="/demande-devis">Faire une demande</Link>
                  </Button>
                </div>
              ) : (
                <>
                  <div className="mb-4">
                    <Button asChild>
                      <Link to="/demande-devis">Nouvelle demande</Link>
                    </Button>
                  </div>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Départ</TableHead>
                          <TableHead>Destination</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Mode</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Statut</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {quotes.map((quote) => (
                          <TableRow key={quote.id}>
                            <TableCell>{quote.departure_location}</TableCell>
                            <TableCell>{quote.destination_location}</TableCell>
                            <TableCell>{quote.transport_type}</TableCell>
                            <TableCell>{quote.transport_mode}</TableCell>
                            <TableCell>
                              {new Date(quote.shipment_date).toLocaleDateString("fr-FR")}
                            </TableCell>
                            <TableCell>
                              <Badge variant={getStatusBadgeVariant(quote.status)}>
                                {quote.status === "pending" ? "En attente" : 
                                 quote.status === "approved" ? "Approuvé" : "Rejeté"}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </>
              )}
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
