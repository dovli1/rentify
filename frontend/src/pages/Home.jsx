import { Link } from 'react-router-dom';
import { Building2, Search, CheckCircle, Shield, Star, TrendingUp } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Style Airbnb */}
      <div className="relative bg-gradient-to-r from-blue-500 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Trouvez votre colocation idéale
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-white/90">
              La plateforme qui connecte propriétaires et locataires
            </p>

            {/* 2 Cartes principales */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Carte Propriétaire */}
              <div className="bg-white text-gray-900 rounded-2xl shadow-2xl overflow-hidden hover:scale-105 transition-transform duration-300">
                <div className="p-8">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <Building2 className="h-8 w-8 text-rose-600" />
                  </div>
                  <h2 className="text-2xl font-bold mb-3">Je loue mon logement</h2>
                  <p className="text-gray-600 mb-6">
                    Gérez vos propriétés, locataires et contrats en toute simplicité
                  </p>
                  <ul className="text-left space-y-2 mb-6">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-sm">Publiez vos annonces</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-sm">Gérez les réservations</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-sm">Suivez les paiements</span>
                    </li>
                  </ul>
                  <Link
                    to="/register/proprietaire"
                    className="block w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-rose-700 transition-colors mb-3"
                  >
                    S'inscrire comme propriétaire
                  </Link>
                  <Link
                    to="/login"
                    className="block w-full text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Déjà inscrit ? Se connecter
                  </Link>
                </div>
              </div>

              {/* Carte Locataire */}
              <div className="bg-white text-gray-900 rounded-2xl shadow-2xl overflow-hidden hover:scale-105 transition-transform duration-300">
                <div className="p-8">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                    <Search className="h-8 w-8 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold mb-3">Je cherche un logement</h2>
                  <p className="text-gray-600 mb-6">
                    Trouvez la colocation parfaite et réservez en quelques clics
                  </p>
                  <ul className="text-left space-y-2 mb-6">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-sm">Recherche personnalisée</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-sm">Réservation en ligne</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-sm">Paiement sécurisé</span>
                    </li>
                  </ul>
                  <Link
                    to="/register/locataire"
                    className="block w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors mb-3"
                  >
                    S'inscrire comme locataire
                  </Link>
                  <Link
                    to="/login"
                    className="block w-full text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Déjà inscrit ? Se connecter
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section Statistiques */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">1000+</div>
              <div className="text-gray-600">Propriétés disponibles</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">5000+</div>
              <div className="text-gray-600">Locataires satisfaits</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">98%</div>
              <div className="text-gray-600">Taux de satisfaction</div>
            </div>
          </div>
        </div>
      </div>

      {/* Section Avantages */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Pourquoi choisir Rentify ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Sécurisé</h3>
              <p className="text-gray-600">
                Paiements protégés et vérification des profils pour votre sécurité
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Star className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Fiable</h3>
              <p className="text-gray-600">
                Système de notation et avis pour des choix éclairés
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-md text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Efficace</h3>
              <p className="text-gray-600">
                Trouvez ou louez rapidement grâce à notre plateforme intuitive
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Prêt à commencer ?</h2>
          <p className="text-xl mb-8">Rejoignez des milliers d'utilisateurs satisfaits</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register/proprietaire"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Devenir propriétaire
            </Link>
            <Link
              to="/register/locataire"
              className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
            >
              Trouver un logement
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;