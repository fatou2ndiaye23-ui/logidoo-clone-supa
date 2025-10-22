import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const DemandeDevis = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    transportMode: "",
    transportType: "",
    departureLocation: "",
    destinationLocation: "",
    shipmentDate: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast.error("Vous devez être connecté pour faire une demande de devis");
        navigate("/auth");
        return;
      }

      const { error } = await supabase.from("quotes").insert({
        user_id: session.user.id,
        transport_mode: formData.transportMode,
        transport_type: formData.transportType,
        departure_location: formData.departureLocation,
        destination_location: formData.destinationLocation,
        shipment_date: formData.shipmentDate,
        status: "pending",
      });

      if (error) throw error;

      toast.success("Demande de devis envoyée avec succès !");
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.message || "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-20 bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4">Demande de cotation</h1>
              <p className="text-muted-foreground">
                Remplissez le formulaire pour obtenir un devis personnalisé
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Informations d'expédition</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Mode de transport</label>
                      <Select
                        value={formData.transportMode}
                        onValueChange={(value) =>
                          setFormData({ ...formData, transportMode: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="aerial">Aérien</SelectItem>
                          <SelectItem value="maritime">Maritime</SelectItem>
                          <SelectItem value="road">Routier</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Type de transport</label>
                      <Select
                        value={formData.transportType}
                        onValueChange={(value) =>
                          setFormData({ ...formData, transportType: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="express">Express</SelectItem>
                          <SelectItem value="standard">Standard</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Lieu de départ</label>
                      <Input
                        placeholder="Entrez le lieu de départ"
                        value={formData.departureLocation}
                        onChange={(e) =>
                          setFormData({ ...formData, departureLocation: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Lieu de destination</label>
                      <Input
                        placeholder="Entrez le lieu de destination"
                        value={formData.destinationLocation}
                        onChange={(e) =>
                          setFormData({ ...formData, destinationLocation: e.target.value })
                        }
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Date d'expédition</label>
                    <div className="relative">
                      <Input
                        type="date"
                        value={formData.shipmentDate}
                        onChange={(e) =>
                          setFormData({ ...formData, shipmentDate: e.target.value })
                        }
                        required
                      />
                      <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>

                  <Button type="submit" className="w-full" size="lg" disabled={loading}>
                    {loading ? "Envoi en cours..." : "Envoyer la demande"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DemandeDevis;
