import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, MapPin, FileText, TrendingUp } from "lucide-react";

const tools = [
  {
    icon: Calculator,
    title: "Calculateur de fret",
    description: "Estimez le coût de votre expédition en quelques clics",
  },
  {
    icon: MapPin,
    title: "Localisateur de port",
    description: "Trouvez les ports et aéroports les plus proches",
  },
  {
    icon: FileText,
    title: "Documents douaniers",
    description: "Préparez vos documents d'exportation et d'importation",
  },
  {
    icon: TrendingUp,
    title: "Suivi des tendances",
    description: "Analysez les tendances du marché du transport",
  },
];

const Outils = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-20 bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Outils logistiques</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Des outils professionnels pour faciliter la gestion de vos expéditions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tools.map((tool, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <tool.icon className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>{tool.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{tool.description}</p>
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

export default Outils;
