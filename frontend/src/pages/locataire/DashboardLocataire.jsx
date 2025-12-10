import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { Search, Home, Calendar, FileText, DollarSign, MessageSquare, MapPin, Star } from 'lucide-react';

const DashboardLocataire = () => {
  const { user } = useAuth();

  const stats = [
    {
      icon: Home,
      title: 'Mon Logement',
      value: 'Aucun',
      subtitle: 'Rechercher un logement',
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    {
      icon: Calendar,
      title: 'Mes Réservations',
      value: '0',
      subtitle: 'Réservations actives',
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
    },
    {
      icon: DollarSign,
      title: 'Prochain Paiement',
      value: '-',
      subtitle: 'Aucun paiement dû',
      color: 'bg-yellow-500',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600',
    },
    {
      icon: MessageSquare,
      title: 'Messages',
      value: '0',
      subtitle: 'Nouveaux messages',
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
    },
  ];

  const quickActions = [
    {
      icon: Search,
      title: 'Rechercher un logement',
      description: 'Trouvez votre colocation idéale',
      link: '/locataire/recherche',
      color: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      icon: Calendar,
      title: 'Mes réservations',
      description: 'Gérer mes demandes',
      link: '/locataire/reservations',
      color: 'bg-green-600 hover:bg-green-700',
    },
    {
      icon: FileText,
      title: 'Mon contrat',
      description: 'Consulter mon bail',
      link: '/locataire/contrat',
      color: 'bg-purple-600 hover:bg-purple-700',
    },
    {
      icon: DollarSign,
      title: 'Mes paiements',
      description: 'Historique et factures',
      link: '/locataire/paiements',
      color: 'bg-yellow-600 hover:bg-yellow-700',
    },
  ];

  const featuredProperties = [
    {
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400',
      title: 'Studio moderne centre-ville',
      location: 'Paris 15ème',
      price: '650€',
      rating: 4.8,
      rooms: 1,
    },
    {
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400',
      title: 'Appartement T3 lumineux',
      location: 'Lyon 6ème',
      price: '850€',
      rating: 4.9,
      rooms: 3,
    },
    {
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400',
      title: 'Colocation spacieuse',
      location: 'Marseille 8ème',
      price: '550€',
      rating: 4.7,
      rooms: 4,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Bienvenue, {user?.name} ! 👋
          </h1>
          <p className="text-gray-600 mt-2">
            Trouvez votre colocation idéale et gérez vos réservations
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className={`p-3 rounded-lg ${stat.bgColor} inline-block mb-3`}>
                  <Icon className={`h-6 w-6 ${stat.textColor}`} />
                </div>
                <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.title}</h3>
                <p className={`text-2xl font-bold ${stat.textColor} mb-1`}>{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.subtitle}</p>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Actions rapides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Link
                  key={index}
                  to={action.link}
                  className={`${action.color} text-white p-6 rounded-xl hover:scale-105 transition-transform shadow-md`}
                >
                  <Icon className="h-8 w-8 mb-3" />
                  <h3 className="font-semibold text-lg mb-1">{action.title}</h3>
                  <p className="text-sm text-white/80">{action.description}</p>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Featured Properties */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Logements recommandés</h2>
            <Link to="/locataire/recherche" className="text-blue-600 hover:text-blue-700 font-medium">
              Voir tout →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProperties.map((property, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg text-gray-900">{property.title}</h3>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{property.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{property.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-blue-600">{property.price}</span>
                      <span className="text-sm text-gray-500">/mois</span>
                    </div>
                    <div className="text-sm text-gray-600">{property.rooms} chambres</div>
                  </div>
                  <Link
                    to={`/locataire/logement/${index}`}
                    className="mt-4 block w-full bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Voir les détails
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-3">Prêt à trouver votre logement ?</h2>
          <p className="mb-6 text-blue-100">
            Explorez des centaines de colocations disponibles dans toute la France
          </p>
          <Link
            to="/locataire/recherche"
            className="inline-flex items-center space-x-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            <Search className="h-5 w-5" />
            <span>Commencer la recherche</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardLocataire;