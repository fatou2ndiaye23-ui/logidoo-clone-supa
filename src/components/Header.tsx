import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import logo from "@/assets/teranga-logix-logo.jpg";

const Header = () => {
  return (
    <header className="border-b bg-background">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Teranga Logix" className="h-10 w-auto" />
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/suivre-colis" className="text-sm hover:text-primary transition-colors">
              Suivre mon colis
            </Link>
            <Link to="/demande-devis" className="text-sm hover:text-primary transition-colors">
              Demande de cotation
            </Link>
            <Link to="/outils" className="text-sm hover:text-primary transition-colors">
              Outils
            </Link>
            <Link to="/produits" className="text-sm hover:text-primary transition-colors">
              Produits
            </Link>
            <Link to="/entreprise" className="text-sm hover:text-primary transition-colors">
              Entreprise
            </Link>
            <Link to="/portail-developpeur" className="text-sm hover:text-primary transition-colors">
              Portail développeur
            </Link>
            <Button variant="secondary" size="sm" asChild>
              <Link to="/service-commercial">Service commercial</Link>
            </Button>
          </nav>

          <div className="flex items-center gap-3">
            <Button variant="default" size="sm" asChild>
              <Link to="/auth">Se connecter</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
