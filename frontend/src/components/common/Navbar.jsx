import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Home, Menu, X, LogOut, LayoutDashboard } from 'lucide-react';
import { logout } from '../../store/authSlice';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
    setIsMenuOpen(false);
  };

  const closeMenu = () => setIsMenuOpen(false);

  // Vérifier si le lien est actif
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-container container">
        <div className="navbar-logo">
          <Link to="/" className="logo-link" onClick={closeMenu}>
            <Home size={28} className="logo-icon" />
            <span className="logo-text">Rentify</span>
          </Link>
        </div>

        <div className="navbar-menu-desktop">
          <Link 
            to="/" 
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
          >
            Accueil
          </Link>
          <Link 
            to="/properties" 
            className={`nav-link ${isActive('/properties') ? 'active' : ''}`}
          >
            Propriétés
          </Link>
          <Link 
            to="/about" 
            className={`nav-link ${isActive('/about') ? 'active' : ''}`}
          >
            À propos
          </Link>
          <Link 
            to="/contact" 
            className={`nav-link ${isActive('/contact') ? 'active' : ''}`}
          >
            Contact
          </Link>
          
          {isAuthenticated && user?.role === 'proprietaire' && (
            <Link 
              to="/dashboard" 
              className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
            >
              Tableau de bord
            </Link>
          )}
        </div>

        <div className="navbar-auth">
          {isAuthenticated ? (
            <div className="auth-user">
              <div className="user-info">
                <span className="user-name">{user?.name || 'Utilisateur'}</span>
              </div>
              <button onClick={handleLogout} className="btn-logout">
                <LogOut size={20} />
                <span>Déconnexion</span>
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn-auth btn-login">Connexion</Link>
              <Link to="/register" className="btn-auth btn-register">S'inscrire</Link>
            </div>
          )}
        </div>

        <button 
          className="menu-toggle" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Menu Mobile */}
      {isMenuOpen && (
        <div className="navbar-mobile">
          <Link 
            to="/" 
            className={`mobile-link ${isActive('/') ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Accueil
          </Link>
          <Link 
            to="/properties" 
            className={`mobile-link ${isActive('/properties') ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Propriétés
          </Link>
          <Link 
            to="/about" 
            className={`mobile-link ${isActive('/about') ? 'active' : ''}`}
            onClick={closeMenu}
          >
            À propos
          </Link>
          <Link 
            to="/contact" 
            className={`mobile-link ${isActive('/contact') ? 'active' : ''}`}
            onClick={closeMenu}
          >
            Contact
          </Link>
          
          {isAuthenticated ? (
            <>
              {user?.role === 'proprietaire' && (
                <Link 
                  to="/dashboard" 
                  className={`mobile-link ${isActive('/dashboard') ? 'active' : ''}`}
                  onClick={closeMenu}
                >
                  Tableau de bord
                </Link>
              )}
              <button onClick={handleLogout} className="mobile-link btn-logout-mobile">
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className={`mobile-link ${isActive('/login') ? 'active' : ''}`}
                onClick={closeMenu}
              >
                Connexion
              </Link>
              <Link 
                to="/register" 
                className={`mobile-link ${isActive('/register') ? 'active' : ''}`}
                onClick={closeMenu}
              >
                S'inscrire
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;