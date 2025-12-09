import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { Building2, Users, DollarSign, FileText, TrendingUp, AlertCircle, Plus, Eye } from 'lucide-react';

const DashboardProprietaire = () => {
  const { user } = useAuth();

  const stats = [
    {
      icon: Building2,
      title: 'Mes Propriétés',
      value: '0',
      change: '+0',
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    {
      icon: Users,
      title: 'Locataires Actifs',
      value: '0',
      change: '+0',
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
    },
    {
      icon: DollarSign,
      title: 'Revenus ce mois',
      value: '0 €',
      change: '+0%',
      color: 'bg-yellow-500',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600',
    },
    {
      icon: AlertCircle,
      title: 'Paiements en attente',
      value: '0',
      change: '0 en retard',
      color: 'bg-red-500',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
    },
  ];

  const quickActions = [
    {
      icon: Plus,
      title: 'Ajouter une propriété',
      description: 'Publiez une nouvelle annonce',
      link: '/proprietaire/properties/new',
      color: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      icon: Users,
      title: 'Gérer les locataires',
      description: 'Voir tous vos locataires',
      link: '/proprietaire/locataires',
      color: 'bg-green-600 hover:bg-green-700',
    },
    {
      icon: FileText,
      title: 'Contrats',
      description: 'Gérer les baux',
      link: '/proprietaire/contrats',
      color: 'bg-purple-600 hover:bg-purple-700',
    },
    {
      icon: DollarSign,
      title: 'Paiements',
      description: 'Suivre les loyers',
      link: '/proprietaire/paiements',
      color: 'bg-yellow-600 hover:bg-yellow-700',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Bonjour, {user?.name} ! 👋
          </h1>
          <p className="text-gray-600 mt-2">
            Voici un aperçu de votre activité de gestion locative
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
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`h-6 w-6 ${stat.textColor}`} />
                  </div>
                </div>
                <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.title}</h3>
                <div className="flex items-end justify-between">
                  <p className={`text-3xl font-bold ${stat.textColor}`}>{stat.value}</p>
                  <span className="text-sm text-gray-500">{stat.change}</span>
                </div>
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

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Dernières réservations */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Réservations récentes</h2>
              <Link to="/proprietaire/reservations" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Voir tout
              </Link>
            </div>
            <div className="text-center py-12">
              <Eye className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500">Aucune réservation pour le moment</p>
            </div>
          </div>

          {/* Paiements récents */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Paiements récents</h2>
              <Link to="/proprietaire/paiements" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Voir tout
              </Link>
            </div>
            <div className="text-center py-12">
              <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500">Aucun paiement enregistré</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-3">Commencez à gérer vos propriétés</h2>
          <p className="mb-6 text-blue-100">
            Ajoutez votre première propriété pour commencer à recevoir des réservations
          </p>
          <Link
            to="/proprietaire/properties/new"
            className="inline-flex items-center space-x-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>Ajouter une propriété</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardProprietaire;