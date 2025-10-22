const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4">logidoo</h3>
            <p className="text-sm opacity-90">
              Votre partenaire de confiance pour tous vos besoins de transport et logistique.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm opacity-90">
              <li>Transport aérien</li>
              <li>Transport maritime</li>
              <li>Transport routier</li>
              <li>Groupage</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Entreprise</h4>
            <ul className="space-y-2 text-sm opacity-90">
              <li>À propos</li>
              <li>Carrières</li>
              <li>Partenaires</li>
              <li>Contact</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm opacity-90">
              <li>Centre d'aide</li>
              <li>Conditions d'utilisation</li>
              <li>Politique de confidentialité</li>
              <li>FAQ</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-secondary-foreground/20 pt-8 text-center text-sm opacity-90">
          <p>© 2024 Teranga Logix. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
