import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plane, Ship, Truck, Package } from "lucide-react";

const products = [
  {
    icon: Plane,
    title: "Transport aérien",
    description: "Solutions rapides et sécurisées pour vos envois urgents",
    features: ["Livraison express", "Suivi en temps réel", "Assurance incluse"],
  },
  {
    icon: Ship,
    title: "Transport maritime",
    description: "Options économiques pour vos envois volumineux",
    features: ["Grandes capacités", "Tarifs compétitifs", "Réseau mondial"],
  },
  {
    icon: Truck,
    title: "Transport routier",
    description: "Flexibilité et efficacité pour vos livraisons terrestres",
    features: ["Livraison porte-à-porte", "Réseau étendu", "Options flexibles"],
  },
  {
    icon: Package,
    title: "Groupage",
    description: "Optimisez vos coûts avec nos solutions de groupage",
    features: ["Économique", "Consolidation", "Départ régulier"],
  },
];

const Produits = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-20 bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Nos produits</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Des solutions logistiques adaptées à tous vos besoins de transport
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {products.map((product, index) => (
              <Card key={index}>
                <CardHeader>
                  <product.icon className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>{product.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{product.description}</p>
                  <ul className="space-y-2">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full">En savoir plus</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Produits;
