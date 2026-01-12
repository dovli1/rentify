import { useState } from 'react';
import { Search, MapPin, Home, Euro } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';

const SearchBar = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({
    location: '',
    type: '',
    price: ''
  });

  const handleSearch = (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams();
    
    if (searchParams.location) queryParams.append('location', searchParams.location);
    if (searchParams.type) queryParams.append('type', searchParams.type);
    if (searchParams.price) queryParams.append('max_price', searchParams.price);
    
    navigate(`/properties?${queryParams.toString()}`);
  };

  return (
    <form className="search-bar" onSubmit={handleSearch}>
      <div className="search-bar-grid">
        <div className="search-input-group">
          <MapPin size={20} className="search-icon" />
          <input
            type="text"
            placeholder="City Street"
            className="search-input"
            value={searchParams.location}
            onChange={(e) => setSearchParams({...searchParams, location: e.target.value})}
          />
        </div>

        <div className="search-input-group">
          <Home size={20} className="search-icon" />
          <select 
            className="search-input"
            value={searchParams.type}
            onChange={(e) => setSearchParams({...searchParams, type: e.target.value})}
          >
            <option value="">Typology of rent</option>
            <option value="villa">Villa</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="cottage">Cottage</option>
          </select>
        </div>

        <div className="search-input-group">
          <Euro size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Price"
            className="search-input"
            value={searchParams.price}
            onChange={(e) => setSearchParams({...searchParams, price: e.target.value})}
          />
        </div>

        <button type="submit" className="search-button">
          <Search size={20} />
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;