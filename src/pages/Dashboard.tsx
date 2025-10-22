import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import ClientDashboard from "@/components/dashboard/ClientDashboard";
import AdminDashboard from "@/components/dashboard/AdminDashboard";
import DeveloperDashboard from "@/components/dashboard/DeveloperDashboard";
import { toast } from "sonner";

const Dashboard = () => {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/auth");
        return;
      }

      // Récupérer le profil et le rôle
      const { data: profile } = await supabase
        .from("profiles")
        .select("first_name, last_name")
        .eq("id", session.user.id)
        .single();

      const { data: roleData } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .single();

      if (profile) {
        setUserName(`${profile.first_name || ""} ${profile.last_name || ""}`.trim() || "Utilisateur");
      }

      if (roleData) {
        setUserRole(roleData.role);
      }

      setLoading(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Déconnexion réussie");
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Chargement...</p>
      </div>
    );
  }

  if (userRole === "admin") {
    return <AdminDashboard userName={userName} onLogout={handleLogout} />;
  }

  if (userRole === "developer") {
    return <DeveloperDashboard userName={userName} onLogout={handleLogout} />;
  }

  return <ClientDashboard userName={userName} onLogout={handleLogout} />;
};

export default Dashboard;
