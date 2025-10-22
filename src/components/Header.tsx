import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="border-b bg-background">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="text-2xl font-bold">
            logidoo
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm hover:text-primary transition-colors">
              Suivre mon colis
            </Link>
            <Link to="/" className="text-sm hover:text-primary transition-colors">
              Demande de cotation
            </Link>
            <Link to="/" className="text-sm hover:text-primary transition-colors">
              Outils
            </Link>
            <Link to="/" className="text-sm hover:text-primary transition-colors">
              Produits
            </Link>
            <Link to="/" className="text-sm hover:text-primary transition-colors">
              Entreprise
            </Link>
            <Link to="/" className="text-sm hover:text-primary transition-colors">
              Portail développeur
            </Link>
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
