import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { Users, Building2, FileText, AlertTriangle, TrendingUp, Activity, Shield, Settings } from 'lucide-react';

const DashboardAdmin = () => {
  const { user } = useAuth();

  const stats = [
    {
      icon: Users,
      title: 'Total Utilisateurs',
      value: '0',
      detail: '0 propriétaires, 0 locataires',
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    {
      icon: Building2,
      title: 'Total Propriétés',
      value: '0',
      detail: '0 actives, 0 inactives',
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
    },
    {
      icon: FileText,
      title: 'Contrats Actifs',
      value: '0',
      detail: '0 en cours, 0 expirés',
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
    },
    {
      icon: AlertTriangle,
      title: 'Alertes',
      value: '0',
      detail: 'Aucun problème signalé',
      color: 'bg-red-500',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
    },
  ];

  const quickActions = [
    {
      icon: Users,
      title: 'Gérer les utilisateurs',
      description: 'Voir, modifier, supprimer',
      link: '/admin/utilisateurs',
      color: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      icon: Building2,
      title: 'Gérer les propriétés',
      description: 'Modérer les annonces',
      link: '/admin/proprietes',
      color: 'bg-green-600 hover:bg-green-700',
    },
    {
      icon: Activity,
      title: 'Statistiques',
      description: 'Rapports détaillés',
      link: '/admin/statistiques',
      color: 'bg-purple-600 hover:bg-purple-700',
    },
    {
      icon: Settings,
      title: 'Paramètres',
      description: 'Configuration système',
      link: '/admin/parametres',
      color: 'bg-gray-600 hover:bg-gray-700',
    },
  ];

  const recentActivity = [
    {
      type: 'user',
      message: 'Nouveau utilisateur inscrit',
      time: 'Il y a 2 heures',
      icon: Users,
      color: 'text-blue-600',
    },
    {
      type: 'property',
      message: 'Nouvelle propriété ajoutée',
      time: 'Il y a 5 heures',
      icon: Building2,
      color: 'text-green-600',
    },
    {
      type: 'alert',
      message: 'Signalement à modérer',
      time: 'Il y a 1 jour',
      icon: AlertTriangle,
      color: 'text-red-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header avec badge admin */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <Shield className="h-8 w-8 text-purple-600" />
            <h1 className="text-3xl font-bold text-gray-900">
              Administration
            </h1>
          </div>
          <p className="text-gray-600">
            Bienvenue {user?.name} - Panneau de contrôle administrateur
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
                <p className={`text-3xl font-bold ${stat.textColor} mb-1`}>{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.detail}</p>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Actions administrateur</h2>
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

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Activité récente</h2>
              <Link to="/admin/logs" className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                Voir tout
              </Link>
            </div>
            {recentActivity.length > 0 ? (
              <div className="space-y-4">
                {recentActivity.map((activity, index) => {
                  const Icon = activity.icon;
                  return (
                    <div key={index} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className={`p-2 rounded-lg bg-gray-100`}>
                        <Icon className={`h-5 w-5 ${activity.color}`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                Aucune activité récente
              </div>
            )}
          </div>

          {/* System Status */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">État du système</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="font-medium text-gray-900">Serveur</span>
                </div>
                <span className="text-sm text-green-600">Opérationnel</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="font-medium text-gray-900">Base de données</span>
                </div>
                <span className="text-sm text-green-600">Opérationnel</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="font-medium text-gray-900">API</span>
                </div>
                <span className="text-sm text-green-600">Opérationnel</span>
              </div>
            </div>
          </div>
        </div>

        {/* Alert Banner */}
        <div className="mt-8 bg-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-start space-x-4">
            <Shield className="h-6 w-6 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg mb-2">Accès Administrateur</h3>
              <p className="text-purple-100">
                Vous avez accès à toutes les fonctionnalités de la plateforme. Utilisez vos privilèges avec responsabilité.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;