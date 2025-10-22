import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Users, Award, Globe } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Notre mission",
    description: "Simplifier la logistique internationale pour rendre le transport accessible à tous",
  },
  {
    icon: Users,
    title: "Notre équipe",
    description: "Des experts passionnés au service de votre réussite",
  },
  {
    icon: Award,
    title: "Notre expertise",
    description: "Plus de 10 ans d'expérience dans le transport international",
  },
  {
    icon: Globe,
    title: "Notre réseau",
    description: "Présents dans plus de 150 pays à travers le monde",
  },
];

const Entreprise = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-20 bg-gradient-to-b from-primary/10 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-5xl font-bold mb-6">À propos de Teranga Logix</h1>
              <p className="text-lg text-muted-foreground">
                Nous sommes une entreprise de transport et de logistique dédiée à fournir
                des solutions innovantes et fiables pour tous vos besoins d'expédition.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <value.icon className="h-12 w-12 text-primary mb-4" />
                    <h3 className="text-2xl font-bold mb-3">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Notre engagement</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Nous nous engageons à fournir un service de qualité supérieure,
                à respecter nos délais et à maintenir la transparence dans toutes nos opérations.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Entreprise;
