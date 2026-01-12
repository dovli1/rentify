import { Home, Mail, Phone, MapPin } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <div className="footer-logo">
              <Home size={32} />
              <h3 className="footer-title">Rentify</h3>
            </div>
            <p className="footer-description">
              Votre solution complète pour la gestion de colocations. Simplifiez votre gestion immobilière avec nos outils modernes.
            </p>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Navigation</h4>
            <ul className="footer-links">
              <li><a href="/">Accueil</a></li>
              <li><a href="/properties">Propriétés</a></li>
              <li><a href="/about">À propos</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Services</h4>
            <ul className="footer-links">
              <li><a href="/">Gestion de propriétés</a></li>
              <li><a href="/">Gestion des locataires</a></li>
              <li><a href="/">Suivi des paiements</a></li>
              <li><a href="/">Contrats de bail</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-heading">Contact</h4>
            <div className="footer-contact">
              <div className="contact-item">
                <MapPin size={18} />
                <span>123 Avenue des Champs, Paris 75008</span>
              </div>
              <div className="contact-item">
                <Phone size={18} />
                <span>+33 1 23 45 67 89</span>
              </div>
              <div className="contact-item">
                <Mail size={18} />
                <span>contact@rentify.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Rentify. Tous droits réservés.</p>
          <div className="footer-legal">
            <a href="/privacy">Confidentialité</a>
            <a href="/terms">Conditions d'utilisation</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;