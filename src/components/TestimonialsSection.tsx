import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Aïssatou Diop",
    role: "Client satisfait",
    initials: "AD",
    content: "Le suivi en temps réel est fantastique ! C'est motivant de voir chaque colis progresser jour après jour. La plateforme allie simplicité et fiabilité à la perfection."
  },
  {
    name: "Youssef El Fassi",
    role: "Client satisfait",
    initials: "YF",
    content: "La traçabilité des livraisons est exceptionnelle. Voir l'avancée de nos envois en direct booste notre productivité. Une solution logistique vraiment innovante et robuste."
  },
  {
    name: "Marie Dupont",
    role: "Client satisfait",
    initials: "MD",
    content: "Service impeccable ! Les délais sont respectés et l'équipe est très réactive. Je recommande vivement pour tous vos besoins en logistique."
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Témoignages</h2>
          <p className="text-muted-foreground">Ce que nos clients disent de nous</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <p className="text-sm mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
