import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Configuration = () => {
  return (
    <div className="min-h-screen bg-muted/30 p-4 md:p-8">
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
          <CardTitle>Configuration du Système</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Paramètres généraux de l'application. Gérez les configurations système ici.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Configuration;
