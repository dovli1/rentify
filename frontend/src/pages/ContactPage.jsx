import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock, MessageSquare } from 'lucide-react';
import toast from 'react-hot-toast';
import './ContactPage.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation basique
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    // Simulation d'envoi
    toast.success('Message envoyé avec succès ! Nous vous répondrons dans les 48h.');
    
    // Réinitialiser le formulaire
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="container">
          <div className="contact-hero-content">
            <h1 className="contact-title">Contactez-nous</h1>
            <p className="contact-subtitle">
              Notre équipe est là pour vous aider. N'hésitez pas à nous contacter pour toute question.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            {/* Informations de contact */}
            <div className="contact-info">
              <h2 className="section-title">Comment nous joindre</h2>
              <p className="contact-description">
                Nous sommes disponibles pour répondre à toutes vos questions concernant la gestion 
                de vos propriétés en colocation.
              </p>

              <div className="contact-details">
                <div className="contact-item">
                  <div className="contact-icon">
                    <Phone size={24} />
                  </div>
                  <div className="contact-text">
                    <h3>Téléphone</h3>
                    <p>+33 1 23 45 67 89</p>
                    <p className="contact-note">Lundi - Vendredi, 9h-18h</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">
                    <Mail size={24} />
                  </div>
                  <div className="contact-text">
                    <h3>Email</h3>
                    <p>contact@rentify.com</p>
                    <p className="contact-note">Réponse sous 24h</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">
                    <MapPin size={24} />
                  </div>
                  <div className="contact-text">
                    <h3>Adresse</h3>
                    <p>123 Avenue des Champs</p>
                    <p>75008 Paris, France</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">
                    <Clock size={24} />
                  </div>
                  <div className="contact-text">
                    <h3>Horaires</h3>
                    <p>Lundi - Vendredi: 9h-18h</p>
                    <p>Samedi: 10h-14h</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Formulaire de contact */}
            <div className="contact-form-container">
              <div className="form-header">
                <MessageSquare size={32} />
                <h2 className="form-title">Envoyez-nous un message</h2>
                <p className="form-subtitle">
                  Remplissez le formulaire ci-dessous et nous vous répondrons rapidement.
                </p>
              </div>

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="input-label">Nom complet *</label>
                    <input
                      type="text"
                      className="input-field"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Votre nom"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="input-label">Email *</label>
                    <input
                      type="email"
                      className="input-field"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="votre@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="input-label">Sujet</label>
                  <input
                    type="text"
                    className="input-field"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    placeholder="Sujet de votre message"
                  />
                </div>

                <div className="form-group">
                  <label className="input-label">Message *</label>
                  <textarea
                    className="textarea-field"
                    rows="6"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Votre message..."
                    required
                  />
                </div>

                <button type="submit" className="contact-submit-btn">
                  <Send size={20} />
                  Envoyer le message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section bg-gray-light">
        <div className="container">
          <h2 className="section-title text-center">Questions fréquentes</h2>
          
          <div className="faq-grid">
            <div className="faq-item">
              <h3 className="faq-question">Comment fonctionne Rentify ?</h3>
              <p className="faq-answer">
                Rentify est une plateforme SaaS qui vous permet de gérer vos propriétés en colocation 
                de manière centralisée. Vous pouvez ajouter des propriétés, gérer les locataires, 
                suivre les paiements et générer des contrats.
              </p>
            </div>

            <div className="faq-item">
              <h3 className="faq-question">Combien coûte le service ?</h3>
              <p className="faq-answer">
                Nous proposons plusieurs formules adaptées à vos besoins, allant d'un plan gratuit 
                pour les petites propriétés à des plans professionnels pour les gestionnaires immobiliers.
              </p>
            </div>

            <div className="faq-item">
              <h3 className="faq-question">Puis-je essayer gratuitement ?</h3>
              <p className="faq-answer">
                Oui ! Nous proposons un essai gratuit de 14 jours sans engagement. Vous pouvez tester 
                toutes les fonctionnalités avant de choisir un plan.
              </p>
            </div>

            <div className="faq-item">
              <h3 className="faq-question">Comment ajouter mes propriétés ?</h3>
              <p className="faq-answer">
                Dans votre tableau de bord, cliquez sur "Ajouter une propriété" et remplissez les 
                informations demandées. Vous pouvez ajouter des photos, des descriptions et définir 
                les caractéristiques de chaque propriété.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;