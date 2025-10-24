import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Boutiques = () => {
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

      <Card>
        <CardHeader>
          <CardTitle>Mes Boutiques</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Aucune boutique configurée. Créez votre première boutique pour commencer.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Boutiques;
