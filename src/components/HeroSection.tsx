import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-muted/50 to-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold mb-6">
              Trouvez les meilleures offres de transport avec{" "}
              <span className="text-primary">logidoo</span>
            </h1>
            
            <div className="bg-card p-6 rounded-lg shadow-lg space-y-4">
              <h3 className="font-semibold text-lg">Obtenez votre tarif en quelques clics</h3>
              <p className="text-sm text-muted-foreground">
                Renseignez l'origine, la destination et le mode de transport pour recevoir une offre personnalisée.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Mode de transport</label>
                  <Select defaultValue="aerial">
                    <SelectTrigger>
                      <SelectValue />
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
                  <Select defaultValue="express">
                    <SelectTrigger>
                      <SelectValue />
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
                  <Input placeholder="Entrez le lieu de départ" />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Lieu de destination</label>
                  <Input placeholder="Entrez le lieu de destination" />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Date d'expédition</label>
                <div className="relative">
                  <Input type="date" />
                  <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>
              
              <Button className="w-full" size="lg">
                Rechercher
              </Button>
            </div>
          </div>
          
          <div className="hidden md:block">
            <img 
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=600&fit=crop" 
              alt="Illustration de livraison" 
              className="rounded-lg w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
