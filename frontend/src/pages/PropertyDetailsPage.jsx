import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  MapPin,
  Bed,
  Bath,
  Square,
  Heart,
  Share2,
  Phone,
  Mail,
  Calendar,
  Euro,
  Home,
  ArrowLeft
} from 'lucide-react';
import './PropertyDetailsPage.css';

const PropertyDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  // Données de démo pour la propriété
  const property = {
    id: id || 1,
    title: 'Ocean Breeze Villa',
    price: '€ 910.000,00',
    location: 'Nice, Côte d\'Azur, France',
    description: 'Magnifique villa moderne avec vue sur la mer. Récemment rénovée avec des matériaux de haute qualité.',
    bedrooms: 4,
    bathrooms: 3,
    surface: '200 m²',
    type: 'Villa',
    year: 2020,
    images: [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&auto=format&fit=crop'
    ],
    features: [
      'Vue sur mer',
      'Piscine privée',
      'Garage double',
      'Jardin paysager',
      'Cuisine équipée',
      'Climatisation'
    ],
    owner: {
      name: 'Marie Dubois',
      phone: '+33 6 12 34 56 78',
      email: 'marie.dubois@example.com'
    }
  };

  return (
    <div className="property-details-page">
      <div className="container">
        {/* Header avec bouton retour */}
        <div className="property-header">
          <button onClick={() => navigate(-1)} className="back-button">
            <ArrowLeft size={20} />
            Retour
          </button>
          
          <div className="property-actions">
            <button 
              className={`action-btn favorite-btn ${isFavorite ? 'active' : ''}`}
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart size={20} />
              {isFavorite ? 'Favori' : 'Ajouter aux favoris'}
            </button>
            <button className="action-btn share-btn">
              <Share2 size={20} />
              Partager
            </button>
          </div>
        </div>

        {/* Galerie d'images */}
        <div className="property-gallery">
          <div className="main-image">
            <img src={property.images[0]} alt={property.title} />
          </div>
          <div className="thumbnail-grid">
            {property.images.slice(1).map((img, index) => (
              <div key={index} className="thumbnail">
                <img src={img} alt={`${property.title} ${index + 2}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Informations principales */}
        <div className="property-content">
          <div className="property-main">
            <h1 className="property-title">{property.title}</h1>
            
            <div className="property-location">
              <MapPin size={20} />
              <span>{property.location}</span>
            </div>

            <div className="property-price">{property.price}</div>

            <div className="property-features-overview">
              <div className="feature-item">
                <Bed size={24} />
                <span>{property.bedrooms} chambres</span>
              </div>
              <div className="feature-item">
                <Bath size={24} />
                <span>{property.bathrooms} salles de bain</span>
              </div>
              <div className="feature-item">
                <Square size={24} />
                <span>{property.surface}</span>
              </div>
              <div className="feature-item">
                <Home size={24} />
                <span>{property.type}</span>
              </div>
            </div>

            {/* Description */}
            <div className="property-description">
              <h2>Description</h2>
              <p>{property.description}</p>
            </div>

            {/* Caractéristiques */}
            <div className="property-characteristics">
              <h2>Caractéristiques</h2>
              <div className="features-list">
                {property.features.map((feature, index) => (
                  <div key={index} className="feature-badge">
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Contact & Réservation */}
          <div className="property-sidebar">
            <div className="contact-card">
              <h3>Contactez le propriétaire</h3>
              
              <div className="owner-info">
                <div className="owner-name">
                  <strong>{property.owner.name}</strong>
                </div>
                
                <div className="contact-method">
                  <Phone size={18} />
                  <span>{property.owner.phone}</span>
                </div>
                
                <div className="contact-method">
                  <Mail size={18} />
                  <span>{property.owner.email}</span>
                </div>
              </div>

              <div className="contact-buttons">
                <button className="btn btn-primary">
                  <Phone size={20} />
                  Appeler
                </button>
                <button className="btn btn-secondary">
                  <Mail size={20} />
                  Envoyer un message
                </button>
              </div>
            </div>

            <div className="booking-card">
              <h3>Disponibilité</h3>
              <div className="availability-info">
                <Calendar size={20} />
                <span>Disponible immédiatement</span>
              </div>
              <button className="btn btn-primary" style={{width: '100%'}}>
                <Euro size={20} />
                Demander une visite
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsPage;