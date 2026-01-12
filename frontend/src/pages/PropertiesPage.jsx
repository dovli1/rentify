import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Filter, Search, Home, MapPin, Euro, Loader } from 'lucide-react';
import PropertyCard from '../components/properties/PropertyCard';
import { fetchProperties } from '../store/propertySlice';
import './PropertiesPage.css';

const PropertiesPage = () => {
  const [filters, setFilters] = useState({
    location: '',
    type: '',
    price: '',
    bedrooms: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [localProperties, setLocalProperties] = useState([]);

  const dispatch = useDispatch();
  const { items: properties = [], loading, error } = useSelector((state) => state.properties);

  // Données de démo
  const demoProperties = [
    {
      id: 1,
      title: 'Ocean Breeze Villa',
      price: 910000,
      location: 'Nice, Côte d\'Azur',
      bedrooms: 4,
      bathrooms: 3,
      image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&auto=format&fit=crop',
      type: 'Villa',
      description: 'Magnifique villa avec vue sur la mer'
    },
    {
      id: 2,
      title: 'Jackson House',
      price: 750000,
      location: 'Paris, 16ème arrondissement',
      bedrooms: 3,
      bathrooms: 2,
      image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&auto=format&fit=crop',
      type: 'Maison',
      description: 'Maison de caractère proche du bois de Boulogne'
    },
    {
      id: 3,
      title: 'Lakeside Cottage',
      price: 540000,
      location: 'Annecy, Haute-Savoie',
      bedrooms: 2,
      bathrooms: 1,
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop',
      type: 'Cottage',
      description: 'Charmant cottage au bord du lac'
    },
    {
      id: 4,
      title: 'Modern Apartment',
      price: 320000,
      location: 'Lyon, Presqu\'île',
      bedrooms: 2,
      bathrooms: 1,
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop',
      type: 'Appartement',
      description: 'Appartement moderne au cœur de Lyon'
    },
    {
      id: 5,
      title: 'Mountain Chalet',
      price: 680000,
      location: 'Chamonix, Mont-Blanc',
      bedrooms: 3,
      bathrooms: 2,
      image: 'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=800&auto=format&fit=crop',
      type: 'Chalet',
      description: 'Chalet traditionnel avec cheminée'
    },
    {
      id: 6,
      title: 'City Loft',
      price: 450000,
      location: 'Bordeaux, Centre-ville',
      bedrooms: 1,
      bathrooms: 1,
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop',
      type: 'Loft',
      description: 'Loft industriel avec hauts plafonds'
    }
  ];

  useEffect(() => {
    dispatch(fetchProperties())
      .unwrap()
      .catch(err => {
        console.log('API error, using demo data:', err);
        setLocalProperties(demoProperties);
      });
  }, [dispatch]);

  useEffect(() => {
    if (!loading && properties.length === 0 && !error) {
      setLocalProperties(demoProperties);
    } else if (properties.length > 0) {
      setLocalProperties(properties);
    }
  }, [loading, properties, error]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      location: '',
      type: '',
      price: '',
      bedrooms: ''
    });
    setSearchTerm('');
  };

  const filteredProperties = localProperties.filter(property => {
    const matchesSearch = searchTerm === '' || 
      (property.title && property.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (property.location && property.location.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesLocation = !filters.location || 
      (property.location && property.location.toLowerCase().includes(filters.location.toLowerCase()));
    
    const matchesType = !filters.type || 
      (property.type && property.type.toLowerCase() === filters.type.toLowerCase());
    
    const matchesPrice = !filters.price || 
      (property.price && property.price <= parseFloat(filters.price));
    
    const matchesBedrooms = !filters.bedrooms || 
      (property.bedrooms && property.bedrooms >= parseInt(filters.bedrooms));
    
    return matchesSearch && matchesLocation && matchesType && matchesPrice && matchesBedrooms;
  });

  return (
    <div className="properties-page">
      {/* Hero Section */}
      <section className="properties-hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Trouvez la propriété parfaite</h1>
            <p className="hero-subtitle">
              Découvrez notre sélection exclusive de propriétés à travers la France
            </p>
          </div>
        </div>
      </section>

      {/* Filtres et Recherche */}
      <section className="filters-section">
        <div className="container">
          <div className="filters-container">
            {/* Barre de recherche */}
            <div className="search-container">
              <div className="search-input-group">
                <Search size={20} className="search-icon" />
                <input
                  type="text"
                  placeholder="Rechercher une propriété..."
                  className="search-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Filtres */}
            <div className="filters-grid">
              <div className="filter-group">
                <label className="filter-label">
                  <MapPin size={16} />
                  Localisation
                </label>
                <input
                  type="text"
                  name="location"
                  placeholder="Ville, région..."
                  className="filter-input"
                  value={filters.location}
                  onChange={handleFilterChange}
                />
              </div>

              <div className="filter-group">
                <label className="filter-label">
                  <Home size={16} />
                  Type
                </label>
                <select 
                  name="type"
                  className="filter-input"
                  value={filters.type}
                  onChange={handleFilterChange}
                >
                  <option value="">Tous les types</option>
                  <option value="villa">Villa</option>
                  <option value="maison">Maison</option>
                  <option value="appartement">Appartement</option>
                  <option value="cottage">Cottage</option>
                  <option value="chalet">Chalet</option>
                  <option value="loft">Loft</option>
                </select>
              </div>

              <div className="filter-group">
                <label className="filter-label">
                  <Euro size={16} />
                  Prix max (€)
                </label>
                <input
                  type="number"
                  name="price"
                  placeholder="Prix maximum"
                  className="filter-input"
                  value={filters.price}
                  onChange={handleFilterChange}
                />
              </div>

              <div className="filter-group">
                <label className="filter-label">Chambres min</label>
                <select 
                  name="bedrooms"
                  className="filter-input"
                  value={filters.bedrooms}
                  onChange={handleFilterChange}
                >
                  <option value="">Tous</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                  <option value="5">5+</option>
                </select>
              </div>

              <div className="filter-actions">
                <button 
                  className="btn btn-secondary reset-btn"
                  onClick={handleResetFilters}
                >
                  Réinitialiser
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Résultats */}
      <section className="section">
        <div className="container">
          <div className="results-header">
            <h2 className="results-title">
              {filteredProperties.length} propriété{filteredProperties.length > 1 ? 's' : ''} trouvée{filteredProperties.length > 1 ? 's' : ''}
            </h2>
            {error && (
              <div className="api-warning">
                ⚠️ L'API n'est pas disponible. Affichage des données de démo.
              </div>
            )}
          </div>

          {loading ? (
            <div className="loading-container">
              <Loader size={48} className="loading-spinner" />
              <p>Chargement des propriétés...</p>
            </div>
          ) : filteredProperties.length > 0 ? (
            <div className="properties-grid">
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="no-results">
              <div className="no-results-content">
                <Filter size={64} className="no-results-icon" />
                <h3 className="no-results-title">Aucune propriété trouvée</h3>
                <p className="no-results-text">
                  Aucune propriété ne correspond à vos critères de recherche.
                  Essayez de modifier vos filtres.
                </p>
                <button 
                  className="btn btn-primary"
                  onClick={handleResetFilters}
                >
                  Réinitialiser les filtres
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Vous êtes propriétaire ?</h2>
            <p className="cta-description">
              Ajoutez vos propriétés et commencez à les gérer facilement avec Rentify.
            </p>
            <div className="cta-buttons">
              <a href="/login" className="btn btn-primary">Connectez-vous</a>
              <a href="/register" className="btn btn-secondary">Inscrivez-vous</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PropertiesPage;