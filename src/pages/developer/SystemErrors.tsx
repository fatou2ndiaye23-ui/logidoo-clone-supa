import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface SystemError {
  id: string;
  error_type: string;
  error_message: string;
  stack_trace: string | null;
  url: string | null;
  status: string;
  created_at: string;
  resolved_at: string | null;
}

const SystemErrors = () => {
  const [errors, setErrors] = useState<SystemError[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchErrors();
  }, []);

  const fetchErrors = async () => {
    try {
      const { data, error } = await supabase
        .from("system_errors")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(50);

      if (error) throw error;
      setErrors(data || []);
    } catch (error) {
      console.error("Erreur:", error);
      toast.error("Erreur lors du chargement des erreurs système");
    } finally {
      setLoading(false);
    }
  };

  const markAsResolved = async (errorId: string) => {
    try {
      const { error } = await supabase
        .from("system_errors")
        .update({
          status: "resolved",
          resolved_at: new Date().toISOString(),
        })
        .eq("id", errorId);

      if (error) throw error;
      toast.success("Erreur marquée comme résolue");
      fetchErrors();
    } catch (error) {
      console.error("Erreur:", error);
      toast.error("Erreur lors de la mise à jour");
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    return status === "resolved" ? "secondary" : "destructive";
  };

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
          <CardTitle>Erreurs système</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-muted-foreground">Chargement...</p>
          ) : errors.length === 0 ? (
            <p className="text-muted-foreground">
              Aucune erreur système détectée. Le système fonctionne correctement.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>URL</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {errors.map((error) => (
                  <TableRow key={error.id}>
                    <TableCell>
                      <Badge variant="outline">{error.error_type}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs truncate" title={error.error_message}>
                        {error.error_message}
                      </div>
                    </TableCell>
                    <TableCell>
                      {error.url ? (
                        <span className="text-sm text-muted-foreground">{error.url}</span>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(error.status)}>
                        {error.status === "resolved" ? "Résolu" : "Non résolu"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(error.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {error.status !== "resolved" && (
                        <Button
                          size="sm"
                          onClick={() => markAsResolved(error.id)}
                        >
                          Résoudre
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SystemErrors;
