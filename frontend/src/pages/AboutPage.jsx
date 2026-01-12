import { Shield, Users, Globe, Award } from 'lucide-react';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="about-hero-content">
            <h1 className="about-title">À propos de Rentify</h1>
            <p className="about-subtitle">
              La plateforme de gestion de colocations la plus simple et efficace pour les propriétaires.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section">
        <div className="container">
          <div className="mission-grid">
            <div className="mission-content">
              <h2 className="section-title">Notre Mission</h2>
              <p className="mission-text">
                Chez Rentify, nous croyons que la gestion de propriétés en colocation devrait être simple, 
                transparente et sans stress. Notre mission est de fournir aux propriétaires les outils 
                nécessaires pour gérer efficacement leurs biens tout en offrant aux locataires une 
                expérience locative exceptionnelle.
              </p>
              <p className="mission-text">
                Fondée en 2023, Rentify a aidé des milliers de propriétaires à simplifier leur gestion 
                immobilière et à maximiser leurs revenus locatifs.
              </p>
            </div>
            <div className="mission-image">
              <img 
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop" 
                alt="Équipe Rentify" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section bg-gray-light">
        <div className="container">
          <h2 className="section-title text-center">Nos Valeurs</h2>
          
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">
                <Shield size={32} />
              </div>
              <h3 className="value-title">Confiance & Sécurité</h3>
              <p className="value-description">
                Nous mettons la sécurité et la confidentialité de vos données au cœur de notre plateforme.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">
                <Users size={32} />
              </div>
              <h3 className="value-title">Simplicité</h3>
              <p className="value-description">
                Des outils intuitifs conçus pour simplifier la gestion immobilière au quotidien.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">
                <Globe size={32} />
              </div>
              <h3 className="value-title">Accessibilité</h3>
              <p className="value-description">
                Une plateforme disponible partout, à tout moment, pour tous les types de propriétés.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">
                <Award size={32} />
              </div>
              <h3 className="value-title">Excellence</h3>
              <p className="value-description">
                Un service client dédié et réactif pour vous accompagner à chaque étape.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title text-center">Notre Équipe</h2>
          <p className="section-subtitle text-center">
            Une équipe passionnée dédiée à révolutionner la gestion immobilière
          </p>

          <div className="team-grid">
            <div className="team-card">
              <div className="team-image">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop" alt="Alex Martin" />
              </div>
              <h3 className="team-name">Alex Martin</h3>
              <p className="team-role">CEO & Fondateur</p>
              <p className="team-description">
                Expert en immobilier avec 10+ années d'expérience dans la gestion de propriétés.
              </p>
            </div>

            <div className="team-card">
              <div className="team-image">
                <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&auto=format&fit=crop" alt="Sarah Chen" />
              </div>
              <h3 className="team-name">Sarah Chen</h3>
              <p className="team-role">Directrice Technique</p>
              <p className="team-description">
                Ingénieure logiciel passionnée par la création d'expériences utilisateur exceptionnelles.
              </p>
            </div>

            <div className="team-card">
              <div className="team-image">
                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop" alt="Thomas Dubois" />
              </div>
              <h3 className="team-name">Thomas Dubois</h3>
              <p className="team-role">Responsable Support Client</p>
              <p className="team-description">
                Toujours disponible pour aider nos utilisateurs à résoudre leurs problèmes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <h3 className="stat-number">5,000+</h3>
              <p className="stat-label">Propriétés gérées</p>
            </div>
            <div className="stat-item">
              <h3 className="stat-number">15,000+</h3>
              <p className="stat-label">Locataires satisfaits</p>
            </div>
            <div className="stat-item">
              <h3 className="stat-number">98%</h3>
              <p className="stat-label">Satisfaction client</p>
            </div>
            <div className="stat-item">
              <h3 className="stat-number">24/7</h3>
              <p className="stat-label">Support disponible</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;