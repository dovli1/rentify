import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Heart } from 'lucide-react';
import { useState } from 'react';
import './PropertyCard.css';

const PropertyCard = ({ property }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  // Formater le prix
  const formatPrice = (price) => {
    if (!price) return '0';
    if (typeof price === 'number') {
      return price.toLocaleString('fr-FR');
    }
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  // Tronquer le texte
  const truncateText = (text, maxLength = 60) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="property-card">
      {/* Image */}
      <div className="property-image">
        <img 
          src={property.image || 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&auto=format&fit=crop'} 
          alt={property.title || 'Propriété'} 
        />
        <button 
          className={`favorite-btn ${isFavorite ? 'active' : ''}`}
          onClick={() => setIsFavorite(!isFavorite)}
        >
          <Heart size={18} />
        </button>
        <div className="property-type">
          {property.type || 'Appartement'}
        </div>
      </div>
      
      {/* Contenu */}
      <div className="property-content">
        {/* Titre */}
        <h3 className="property-title">
          {truncateText(property.title || 'Propriété sans nom', 50)}
        </h3>
        
        {/* Localisation */}
        <div className="property-location">
          <MapPin size={16} />
          <span>{truncateText(property.location || 'Localisation non spécifiée', 40)}</span>
        </div>
        
        {/* Caractéristiques */}
        <div className="property-features">
          <div className="feature">
            <Bed size={18} />
            <span>{property.bedrooms || 0} ch.</span>
          </div>
          <div className="feature">
            <Bath size={18} />
            <span>{property.bathrooms || 0} sdb</span>
          </div>
        </div>
        
        {/* Prix et bouton */}
        <div className="property-footer">
          <div className="property-price">
            {formatPrice(property.price || 0)} €
          </div>
          <Link to={`/properties/${property.id || 1}`} className="property-link">
            Voir détails
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;