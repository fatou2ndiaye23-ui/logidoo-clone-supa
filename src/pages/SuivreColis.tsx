import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Package } from "lucide-react";

const SuivreColis = () => {
  const [trackingNumber, setTrackingNumber] = useState("");

  const handleTrack = () => {
    if (trackingNumber.trim()) {
      alert(`Recherche du colis: ${trackingNumber}\n\nFonctionnalité en cours de développement.`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-20 bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <Package className="h-16 w-16 text-primary mx-auto mb-4" />
              <h1 className="text-4xl font-bold mb-4">Suivre mon colis</h1>
              <p className="text-muted-foreground">
                Entrez votre numéro de suivi pour localiser votre colis en temps réel
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Numéro de suivi</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Ex: TL123456789"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                  />
                  <Button onClick={handleTrack}>
                    <Search className="h-4 w-4 mr-2" />
                    Rechercher
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Vous trouverez votre numéro de suivi dans l'email de confirmation d'expédition
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SuivreColis;
