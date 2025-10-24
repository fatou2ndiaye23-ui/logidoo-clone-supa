import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Debours = () => {
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
          <CardTitle>Mes Débours</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Aucun débours enregistré. Cette section affichera l'historique de vos débours.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Debours;
