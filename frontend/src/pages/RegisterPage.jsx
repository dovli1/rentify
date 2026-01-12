import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Phone, Home, UserCircle } from 'lucide-react';
import { registerUser, clearError } from '../store/authSlice';
import toast from 'react-hot-toast';
import '../pages/AuthPages.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    phone: '',
    role: 'locataire'
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      toast.success('Inscription réussie !');
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.password_confirmation) {
      toast.error('Les mots de passe ne correspondent pas');
      return;
    }

    if (!formData.name || !formData.email || !formData.password) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    try {
      await dispatch(registerUser(formData)).unwrap();
    } catch (err) {
      toast.error(err || 'Erreur d\'inscription');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <Home size={40} className="auth-logo" />
          <h1 className="auth-title">Rejoignez Rentify</h1>
          <p className="auth-subtitle">Créez votre compte gratuitement</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="input-label">
              <User size={18} />
              Nom complet
            </label>
            <input
              type="text"
              className="input-field"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Jean Dupont"
              required
            />
          </div>

          <div className="form-group">
            <label className="input-label">
              <Mail size={18} />
              Email
            </label>
            <input
              type="email"
              className="input-field"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="votre@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label className="input-label">
              <Phone size={18} />
              Téléphone
            </label>
            <input
              type="tel"
              className="input-field"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              placeholder="06 12 34 56 78"
            />
          </div>

          <div className="form-group">
            <label className="input-label">
              <UserCircle size={18} />
              Rôle
            </label>
            <select
              className="input-field"
              value={formData.role}
              onChange={(e) => setFormData({...formData, role: e.target.value})}
            >
              <option value="locataire">Locataire</option>
              <option value="proprietaire">Propriétaire</option>
            </select>
          </div>

          <div className="form-group">
            <label className="input-label">
              <Lock size={18} />
              Mot de passe
            </label>
            <input
              type="password"
              className="input-field"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              placeholder="••••••••"
              required
            />
          </div>

          <div className="form-group">
            <label className="input-label">
              <Lock size={18} />
              Confirmer le mot de passe
            </label>
            <input
              type="password"
              className="input-field"
              value={formData.password_confirmation}
              onChange={(e) => setFormData({...formData, password_confirmation: e.target.value})}
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="error-alert">
              <span>{error}</span>
            </div>
          )}

          <div className="form-checkbox">
            <input type="checkbox" id="terms" required />
            <label htmlFor="terms">
              J'accepte les <Link to="/terms">Conditions d'utilisation</Link> et la <Link to="/privacy">Politique de confidentialité</Link>
            </label>
          </div>

          <button 
            type="submit" 
            className="auth-button"
            disabled={loading}
          >
            {loading ? 'Inscription...' : 'S\'inscrire'}
          </button>
        </form>

        <div className="auth-footer">
          <p className="auth-footer-text">
            Vous avez déjà un compte ?{' '}
            <Link to="/login" className="auth-link">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;