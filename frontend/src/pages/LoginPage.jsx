import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Home, AlertCircle } from 'lucide-react';
import { loginUser, clearError } from '../store/authSlice';
import toast from 'react-hot-toast';
import '../pages/AuthPages.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }

    try {
      const result = await dispatch(loginUser(formData)).unwrap();
      if (result.token) {
        toast.success('Connexion réussie !');
        navigate('/dashboard');
      }
    } catch (err) {
      toast.error(err || 'Erreur de connexion');
    }
  };

  // Rediriger si déjà authentifié
  if (isAuthenticated) {
    navigate('/dashboard');
    return null;
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <Home size={40} className="auth-logo" />
          <h1 className="auth-title">Bienvenue sur Rentify</h1>
          <p className="auth-subtitle">Connectez-vous à votre compte</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
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

          <div className="form-options">
            <label className="checkbox-label">
              <input type="checkbox" />
              <span>Se souvenir de moi</span>
            </label>
            <Link to="/forgot-password" className="forgot-link">
              Mot de passe oublié ?
            </Link>
          </div>

          {error && (
            <div className="error-alert">
              <AlertCircle size={20} />
              <span>{error}</span>
            </div>
          )}

          <button 
            type="submit" 
            className="auth-button"
            disabled={loading}
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        <div className="auth-footer">
          <p className="auth-footer-text">
            Vous n'avez pas de compte ?{' '}
            <Link to="/register" className="auth-link">
              S'inscrire
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;