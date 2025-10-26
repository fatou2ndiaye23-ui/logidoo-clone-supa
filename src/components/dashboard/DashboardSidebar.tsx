import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingCart,
  Truck,
  Store,
  DollarSign,
  Warehouse,
  MapPin,
  BookOpen,
  MessageSquare,
  Package,
  Tag,
  User,
  Settings,
  LogOut,
  Users,
  Bug,
  FileText,
} from "lucide-react";

interface DashboardSidebarProps {
  userRole: "client" | "admin" | "developer";
  onLogout: () => void;
}

const DashboardSidebar = ({ userRole, onLogout }: DashboardSidebarProps) => {
  const clientMenuItems = [
    { icon: LayoutDashboard, label: "Tableau de bord", href: "/dashboard" },
    { icon: FileText, label: "Mes devis", href: "/client/mes-devis" },
    { icon: ShoppingCart, label: "Commandes", href: "/client/commandes" },
    { icon: Truck, label: "Livraisons", href: "/client/livraisons" },
    { icon: Store, label: "Boutiques", href: "/client/boutiques" },
    { icon: DollarSign, label: "Débours", href: "/client/debours" },
    { icon: Warehouse, label: "Entrepôts", href: "/client/entrepots" },
    { icon: MapPin, label: "Zones", href: "/client/zones" },
    { icon: BookOpen, label: "Catalogues", href: "/client/catalogues" },
    { icon: MessageSquare, label: "Réclamations", href: "/client/reclamations" },
    { icon: Package, label: "Loads", href: "/client/loads" },
    { icon: Tag, label: "Promotions", href: "/client/promotions" },
  ];

  const adminMenuItems = [
    { icon: LayoutDashboard, label: "Tableau de bord", href: "/dashboard" },
    { icon: FileText, label: "Gestion des devis", href: "/admin/quotes" },
    { icon: Users, label: "Gestion utilisateurs", href: "/admin/users" },
    { icon: Settings, label: "Configuration", href: "/admin/configuration" },
  ];

  const developerMenuItems = [
    { icon: LayoutDashboard, label: "Tableau de bord", href: "/dashboard" },
    { icon: Bug, label: "Gestion des bugs", href: "/developer/bugs" },
    { icon: Users, label: "Gestion des utilisateurs", href: "/developer/emails" },
    { icon: MessageSquare, label: "Erreurs système", href: "/developer/errors" },
    { icon: Settings, label: "Configuration système", href: "/developer/system-config" },
  ];

  let menuItems = clientMenuItems;
  if (userRole === "admin") menuItems = adminMenuItems;
  if (userRole === "developer") menuItems = developerMenuItems;

  return (
    <aside className="w-64 bg-card border-r min-h-screen p-4">
      <Link to="/" className="block mb-8">
        <h2 className="text-xl font-bold text-primary">Teranga Logix</h2>
      </Link>

      <nav className="space-y-1 mb-8">
        <div className="mb-4">
          <p className="text-xs font-semibold text-muted-foreground mb-2 px-3">
            {userRole === "client" && "Dashboard"}
            {userRole === "admin" && "Administration"}
            {userRole === "developer" && "Développement"}
          </p>
          {menuItems.slice(0, 1).map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent text-sm"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </div>

        {userRole === "client" && (
          <div className="mb-4">
            <p className="text-xs font-semibold text-muted-foreground mb-2 px-3">
              E-commerce
            </p>
            {menuItems.slice(1, 12).map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent text-sm"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </div>
        )}

        {(userRole === "admin" || userRole === "developer") && (
          <div className="mb-4">
            <p className="text-xs font-semibold text-muted-foreground mb-2 px-3">
              Gestion
            </p>
            {menuItems.slice(1).map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent text-sm"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </div>
        )}

        <div className="border-t pt-4 mt-4">
          <p className="text-xs font-semibold text-muted-foreground mb-2 px-3">
            Utilisateur
          </p>
          <Link
            to="/profile"
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent text-sm"
          >
            <User className="h-4 w-4" />
            Mon Profil
          </Link>
          <Link
            to="/settings"
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent text-sm"
          >
            <Settings className="h-4 w-4" />
            Paramètres
          </Link>
        </div>
      </nav>

      <Button
        variant="outline"
        className="w-full"
        onClick={onLogout}
      >
        <LogOut className="h-4 w-4 mr-2" />
        Se déconnecter
      </Button>
    </aside>
  );
};

export default DashboardSidebar;
