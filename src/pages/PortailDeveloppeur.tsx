import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code, Book, Key, Zap } from "lucide-react";

const features = [
  {
    icon: Code,
    title: "API REST",
    description: "Intégrez facilement nos services dans vos applications",
  },
  {
    icon: Book,
    title: "Documentation",
    description: "Documentation complète et exemples de code",
  },
  {
    icon: Key,
    title: "Authentification",
    description: "Sécurisez vos appels API avec OAuth 2.0",
  },
  {
    icon: Zap,
    title: "Webhooks",
    description: "Recevez des notifications en temps réel",
  },
];

const PortailDeveloppeur = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-20 bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Portail développeur</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Intégrez nos solutions logistiques dans vos applications
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {features.map((feature, index) => (
              <Card key={index}>
                <CardHeader>
                  <feature.icon className="h-12 w-12 text-primary mb-4" />
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle>Commencer avec l'API</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Notre API vous permet d'accéder à toutes les fonctionnalités de Teranga Logix
                de manière programmatique. Créez des expéditions, suivez des colis et gérez
                vos opérations logistiques directement depuis vos systèmes.
              </p>
              <div className="flex gap-4">
                <Button>Obtenir une clé API</Button>
                <Button variant="outline">Voir la documentation</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PortailDeveloppeur;
