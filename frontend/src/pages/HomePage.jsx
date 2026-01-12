import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Clock, HeadphonesIcon, Search, Home as HomeIcon } from 'lucide-react';
import SearchBar from '../components/common/SearchBar';
import PropertyCard from '../components/properties/PropertyCard';
import { fetchProperties } from '../store/propertySlice';
import './HomePage.css';

const HomePage = () => {
  const dispatch = useDispatch();
  const { items: properties = [], loading } = useSelector((state) => state.properties);

  // Données de démo
  const demoProperties = [
    {
      id: 1,
      title: 'Ocean Breeze Villa',
      price: '€ 910.000,00',
      location: 'Nice, France',
      bedrooms: 4,
      bathrooms: 3,
      image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&auto=format&fit=crop',
      type: 'Villa'
    },
    {
      id: 2,
      title: 'Jackson House',
      price: '€ 750.000,00',
      location: 'Paris, France',
      bedrooms: 3,
      bathrooms: 2,
      image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&auto=format&fit=crop',
      type: 'Maison'
    },
    {
      id: 3,
      title: 'Lakeside Cottage',
      price: '€ 540.000,00',
      location: 'Annecy, France',
      bedrooms: 2,
      bathrooms: 1,
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop',
      type: 'Cottage'
    }
  ];

  // Charger les propriétés UNE FOIS au montage
  useEffect(() => {
    dispatch(fetchProperties());
  }, [dispatch]); // Seulement dispatch comme dépendance

  // Toujours utiliser les données de démo pour l'affichage
  const displayProperties = demoProperties;
  const featuredProperties = displayProperties.slice(0, 3);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Finding Your New Home Is Simple</h1>
            <p className="hero-subtitle">
              Rentify.com is your go to destination for finding the perfect rental home to suit your needs.
              With thousands of property listings across the United States, and Europe.
            </p>
            
            <div className="hero-search">
              <SearchBar />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="section bg-gray-light">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Most Viewed</h2>
            <p className="section-subtitle">
              Discover a range of vacation heritage worldwide. Book securely and get expert customer support for a stress-free stay.
            </p>
          </div>

          <div className="properties-grid">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title text-center">The Easiest Method To Find a House</h2>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <Search size={32} />
              </div>
              <h3 className="feature-title">Recherche Avancée</h3>
              <p className="feature-description">
                Trouvez la propriété parfaite avec nos filtres de recherche avancés et notre interface intuitive.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Shield size={32} />
              </div>
              <h3 className="feature-title">Sécurisé et Fiable</h3>
              <p className="feature-description">
                Toutes nos transactions sont sécurisées et vérifiées pour une expérience de confiance.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <HeadphonesIcon size={32} />
              </div>
              <h3 className="feature-title">Support 24/7</h3>
              <p className="feature-description">
                Notre équipe de support est disponible 24h/24 et 7j/7 pour répondre à toutes vos questions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Prêt à trouver votre nouvelle maison ?</h2>
            <p className="cta-description">
              Rejoignez des milliers de propriétaires et locataires satisfaits sur Rentify.
            </p>
            <div className="cta-buttons">
              <Link to="/properties" className="btn btn-primary">
                Explorer les propriétés
                <ArrowRight size={20} />
              </Link>
              <Link to="/register" className="btn btn-secondary">
                S'inscrire gratuitement
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;