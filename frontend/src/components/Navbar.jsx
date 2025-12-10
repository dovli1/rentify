import { Link, useNavigate } from 'react-router-dom';
import { LogOut, User, Building2, Search, Shield, Home, Users, FileText, DollarSign } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  // Navigation selon le rôle
  const getNavLinks = () => {
    if (!isAuthenticated) return null;

    switch (user?.role) {
      case 'proprietaire':
        return (
          <>
            <Link
              to="/proprietaire/dashboard"
              className="text-gray-700 hover:text-rose-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Dashboard
            </Link>
            <Link
              to="/proprietaire/properties"
              className="text-gray-700 hover:text-rose-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Mes Propriétés
            </Link>
            <Link
              to="/proprietaire/locataires"
              className="text-gray-700 hover:text-rose-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Locataires
            </Link>
            <Link
              to="/proprietaire/contrats"
              className="text-gray-700 hover:text-rose-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Contrats
            </Link>
            <Link
              to="/proprietaire/paiements"
              className="text-gray-700 hover:text-rose-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Paiements
            </Link>
          </>
        );

      case 'locataire':
        return (
          <>
            <Link
              to="/locataire/dashboard"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Dashboard
            </Link>
            <Link
              to="/locataire/recherche"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Rechercher
            </Link>
            <Link
              to="/locataire/reservations"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Mes Réservations
            </Link>
            <Link
              to="/locataire/contrat"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Mon Contrat
            </Link>
            <Link
              to="/locataire/paiements"
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Paiements
            </Link>
          </>
        );

      case 'admin':
        return (
          <>
            <Link
              to="/admin/dashboard"
              className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Dashboard
            </Link>
            <Link
              to="/admin/utilisateurs"
              className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Utilisateurs
            </Link>
            <Link
              to="/admin/proprietes"
              className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Propriétés
            </Link>
            <Link
              to="/admin/statistiques"
              className="text-gray-700 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Statistiques
            </Link>
          </>
        );

      default:
        return null;
    }
  };

  // Icône et couleur selon le rôle
  const getRoleConfig = () => {
    switch (user?.role) {
      case 'proprietaire':
        return {
          icon: Building2,
          badge: 'Propriétaire',
          color: 'bg-rose-100 text-rose-700',
        };
      case 'locataire':
        return {
          icon: Search,
          badge: 'Locataire',
          color: 'bg-blue-100 text-blue-700',
        };
      case 'admin':
        return {
          icon: Shield,
          badge: 'Admin',
          color: 'bg-purple-100 text-purple-700',
        };
      default:
        return {
          icon: User,
          badge: 'Utilisateur',
          color: 'bg-gray-100 text-gray-700',
        };
    }
  };

  const roleConfig = getRoleConfig();
  const RoleIcon = roleConfig.icon;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <div className="bg-gradient-to-r from-rose-500 to-pink-600 p-2 rounded-lg">
                <Home className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">Rentify</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-2">
            {getNavLinks()}
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {/* Badge du rôle */}
                <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${roleConfig.color}`}>
                  <RoleIcon className="h-4 w-4" />
                  <span className="text-sm font-medium">{roleConfig.badge}</span>
                </div>

                {/* User Info */}
                <div className="hidden sm:flex items-center space-x-2 px-3 py-2 bg-gray-100 rounded-lg">
                  <User className="h-5 w-5 text-gray-600" />
                  <span className="text-sm text-gray-700 font-medium">{user?.name}</span>
                </div>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-red-600 hover:text-red-700 px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-red-50"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="hidden sm:inline">Déconnexion</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-gray-900 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Connexion
                </Link>
                <Link
                  to="/register/proprietaire"
                  className="bg-gradient-to-r from-rose-500 to-pink-600 text-white hover:from-rose-600 hover:to-pink-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Inscription
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isAuthenticated && (
        <div className="md:hidden border-t border-gray-200 bg-gray-50">
          <div className="px-2 py-3 space-y-1">
            {getNavLinks()}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;