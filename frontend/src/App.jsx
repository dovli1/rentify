import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';

// Pages publiques
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

// Pages Propriétaire
import DashboardProprietaire from './pages/proprietaire/DashboardProprietaire';

// Pages Locataire
import DashboardLocataire from './pages/locataire/DashboardLocataire';

// Pages Admin
import DashboardAdmin from './pages/admin/DashboardAdmin';

// Composant pour protéger les routes
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Vérifier si le rôle de l'utilisateur est autorisé
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    // Rediriger vers le dashboard approprié
    switch (user?.role) {
      case 'proprietaire':
        return <Navigate to="/proprietaire/dashboard" replace />;
      case 'locataire':
        return <Navigate to="/locataire/dashboard" replace />;
      case 'admin':
        return <Navigate to="/admin/dashboard" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  return children;
};

// Composant pour rediriger les utilisateurs connectés
const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading, user } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    // Rediriger vers le dashboard approprié
    switch (user?.role) {
      case 'proprietaire':
        return <Navigate to="/proprietaire/dashboard" replace />;
      case 'locataire':
        return <Navigate to="/locataire/dashboard" replace />;
      case 'admin':
        return <Navigate to="/admin/dashboard" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  return children;
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster position="top-right" richColors />
        <Navbar />
        <Routes>
          {/* Routes publiques */}
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register/:role"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />

          {/* Routes Propriétaire */}
          <Route
            path="/proprietaire/dashboard"
            element={
              <ProtectedRoute allowedRoles={['proprietaire']}>
                <DashboardProprietaire />
              </ProtectedRoute>
            }
          />
          <Route
            path="/proprietaire/properties"
            element={
              <ProtectedRoute allowedRoles={['proprietaire']}>
                <div className="p-8 text-center">
                  <h1 className="text-2xl font-bold">Mes Propriétés</h1>
                  <p className="text-gray-600 mt-2">Page en construction...</p>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/proprietaire/locataires"
            element={
              <ProtectedRoute allowedRoles={['proprietaire']}>
                <div className="p-8 text-center">
                  <h1 className="text-2xl font-bold">Mes Locataires</h1>
                  <p className="text-gray-600 mt-2">Page en construction...</p>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/proprietaire/contrats"
            element={
              <ProtectedRoute allowedRoles={['proprietaire']}>
                <div className="p-8 text-center">
                  <h1 className="text-2xl font-bold">Mes Contrats</h1>
                  <p className="text-gray-600 mt-2">Page en construction...</p>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/proprietaire/paiements"
            element={
              <ProtectedRoute allowedRoles={['proprietaire']}>
                <div className="p-8 text-center">
                  <h1 className="text-2xl font-bold">Paiements</h1>
                  <p className="text-gray-600 mt-2">Page en construction...</p>
                </div>
              </ProtectedRoute>
            }
          />

          {/* Routes Locataire */}
          <Route
            path="/locataire/dashboard"
            element={
              <ProtectedRoute allowedRoles={['locataire']}>
                <DashboardLocataire />
              </ProtectedRoute>
            }
          />
          <Route
            path="/locataire/recherche"
            element={
              <ProtectedRoute allowedRoles={['locataire']}>
                <div className="p-8 text-center">
                  <h1 className="text-2xl font-bold">Rechercher un logement</h1>
                  <p className="text-gray-600 mt-2">Page en construction...</p>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/locataire/reservations"
            element={
              <ProtectedRoute allowedRoles={['locataire']}>
                <div className="p-8 text-center">
                  <h1 className="text-2xl font-bold">Mes Réservations</h1>
                  <p className="text-gray-600 mt-2">Page en construction...</p>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/locataire/contrat"
            element={
              <ProtectedRoute allowedRoles={['locataire']}>
                <div className="p-8 text-center">
                  <h1 className="text-2xl font-bold">Mon Contrat</h1>
                  <p className="text-gray-600 mt-2">Page en construction...</p>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/locataire/paiements"
            element={
              <ProtectedRoute allowedRoles={['locataire']}>
                <div className="p-8 text-center">
                  <h1 className="text-2xl font-bold">Mes Paiements</h1>
                  <p className="text-gray-600 mt-2">Page en construction...</p>
                </div>
              </ProtectedRoute>
            }
          />

          {/* Routes Admin */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <DashboardAdmin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/utilisateurs"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <div className="p-8 text-center">
                  <h1 className="text-2xl font-bold">Gestion des Utilisateurs</h1>
                  <p className="text-gray-600 mt-2">Page en construction...</p>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/proprietes"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <div className="p-8 text-center">
                  <h1 className="text-2xl font-bold">Gestion des Propriétés</h1>
                  <p className="text-gray-600 mt-2">Page en construction...</p>
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/statistiques"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <div className="p-8 text-center">
                  <h1 className="text-2xl font-bold">Statistiques</h1>
                  <p className="text-gray-600 mt-2">Page en construction...</p>
                </div>
              </ProtectedRoute>
            }
          />

          {/* Route 404 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;