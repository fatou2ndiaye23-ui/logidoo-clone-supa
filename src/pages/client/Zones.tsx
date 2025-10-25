import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z.string().min(1, "Le nom est requis"),
  description: z.string().optional(),
  postal_codes: z.string().optional(),
  delivery_fee: z.string().min(1, "Les frais de livraison sont requis"),
  estimated_delivery_days: z.string().optional(),
});

interface Zone {
  id: string;
  name: string;
  description: string | null;
  postal_codes: string | null;
  delivery_fee: number;
  estimated_delivery_days: number | null;
  created_at: string;
}

const Zones = () => {
  const [zones, setZones] = useState<Zone[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      postal_codes: "",
      delivery_fee: "",
      estimated_delivery_days: "",
    },
  });

  useEffect(() => {
    fetchZones();
  }, []);

  const fetchZones = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { data, error } = await supabase
          .from("delivery_zones")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (error) throw error;
        setZones(data || []);
      }
    } catch (error) {
      console.error("Erreur:", error);
      toast.error("Erreur lors du chargement des zones");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Non authentifié");

      const { error } = await supabase.from("delivery_zones").insert({
        user_id: user.id,
        name: values.name,
        description: values.description,
        postal_codes: values.postal_codes,
        delivery_fee: parseFloat(values.delivery_fee),
        estimated_delivery_days: values.estimated_delivery_days ? parseInt(values.estimated_delivery_days) : null,
      });

      if (error) throw error;

      toast.success("Zone créée avec succès");
      setOpen(false);
      form.reset();
      fetchZones();
    } catch (error) {
      console.error("Erreur:", error);
      toast.error("Erreur lors de la création de la zone");
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 p-8">
      <div className="mb-6 flex justify-between items-center">
        <Link to="/dashboard">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour au tableau de bord
          </Button>
        </Link>
        
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nouvelle zone
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Créer une nouvelle zone de livraison</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom de la zone</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description (optionnel)</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="postal_codes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Codes postaux (optionnel)</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: 10000, 10100, 10200" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="delivery_fee"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Frais de livraison (FCFA)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="estimated_delivery_days"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Délai de livraison estimé (jours) (optionnel)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">Créer la zone</Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Mes Zones de Livraison</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-muted-foreground">Chargement...</p>
          ) : zones.length === 0 ? (
            <p className="text-muted-foreground">
              Aucune zone de livraison configurée. Définissez vos zones pour optimiser vos livraisons.
            </p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {zones.map((zone) => (
                <Card key={zone.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{zone.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {zone.description && <p className="text-sm text-muted-foreground mb-2">{zone.description}</p>}
                    <p className="text-sm font-medium">💰 {zone.delivery_fee} FCFA</p>
                    {zone.estimated_delivery_days && <p className="text-sm">🚚 {zone.estimated_delivery_days} jours</p>}
                    {zone.postal_codes && <p className="text-sm text-muted-foreground mt-2">📮 {zone.postal_codes}</p>}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Zones;
