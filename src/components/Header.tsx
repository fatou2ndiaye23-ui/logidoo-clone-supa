import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import logo from "@/assets/teranga-logix-logo.jpg";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b bg-background">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 md:gap-3">
            <img src={logo} alt="Teranga Logix" className="h-8 md:h-10 w-auto" />
            <span className="text-lg md:text-xl font-bold text-primary">Teranga Logix</span>
          </Link>
          
          <nav className="hidden lg:flex items-center gap-6">
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
            <Button variant="default" size="sm" asChild className="hidden md:flex">
              <Link to="/auth">Se connecter</Link>
            </Button>
            
            {/* Mobile menu */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="sm">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <nav className="flex flex-col gap-4 mt-8">
                  <Link 
                    to="/suivre-colis" 
                    className="text-sm hover:text-primary transition-colors p-2"
                    onClick={() => setOpen(false)}
                  >
                    Suivre mon colis
                  </Link>
                  <Link 
                    to="/demande-devis" 
                    className="text-sm hover:text-primary transition-colors p-2"
                    onClick={() => setOpen(false)}
                  >
                    Demande de cotation
                  </Link>
                  <Link 
                    to="/outils" 
                    className="text-sm hover:text-primary transition-colors p-2"
                    onClick={() => setOpen(false)}
                  >
                    Outils
                  </Link>
                  <Link 
                    to="/produits" 
                    className="text-sm hover:text-primary transition-colors p-2"
                    onClick={() => setOpen(false)}
                  >
                    Produits
                  </Link>
                  <Link 
                    to="/entreprise" 
                    className="text-sm hover:text-primary transition-colors p-2"
                    onClick={() => setOpen(false)}
                  >
                    Entreprise
                  </Link>
                  <Link 
                    to="/portail-developpeur" 
                    className="text-sm hover:text-primary transition-colors p-2"
                    onClick={() => setOpen(false)}
                  >
                    Portail développeur
                  </Link>
                  <Button variant="secondary" size="sm" asChild className="mt-4">
                    <Link to="/service-commercial" onClick={() => setOpen(false)}>
                      Service commercial
                    </Link>
                  </Button>
                  <Button variant="default" size="sm" asChild>
                    <Link to="/auth" onClick={() => setOpen(false)}>
                      Se connecter
                    </Link>
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
