import { Link } from 'react-router-dom';
import { Home, Users, FileText, DollarSign, Bell, MessageSquare, ArrowRight } from 'lucide-react';

const HomePage = () => {
  const features = [
    {
      icon: Home,
      title: 'Gestion des Propriétés',
      description: 'Gérez facilement toutes vos propriétés en colocation depuis un seul endroit.',
    },
    {
      icon: Users,
      title: 'Suivi des Locataires',
      description: 'Gardez une trace complète de tous vos locataires et leurs informations.',
    },
    {
      icon: FileText,
      title: 'Contrats de Bail',
      description: 'Créez et gérez vos contrats de bail en toute simplicité.',
    },
    {
      icon: DollarSign,
      title: 'Gestion des Paiements',
      description: 'Suivez les loyers, générez des factures et envoyez des rappels automatiques.',
    },
    {
      icon: Bell,
      title: 'Notifications',
      description: 'Recevez des alertes en temps réel pour ne rien manquer.',
    },
    {
      icon: MessageSquare,
      title: 'Messagerie Interne',
      description: 'Communiquez facilement avec vos locataires.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Gérez vos <span className="text-primary-600">colocations</span> en toute simplicité
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Rentify est la solution SaaS complète pour les propriétaires qui souhaitent gérer leurs
            biens en colocation de manière professionnelle et efficace.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/register"
              className="bg-primary-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-primary-700 transition-colors flex items-center space-x-2"
            >
              <span>Commencer gratuitement</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/login"
              className="bg-white text-primary-600 border-2 border-primary-600 px-8 py-3 rounded-lg text-lg font-medium hover:bg-primary-50 transition-colors"
            >
              Se connecter
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Toutes les fonctionnalités dont vous avez besoin
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow"
                >
                  <div className="mb-4">
                    <Icon className="h-8 w-8 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 bg-primary-600 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Prêt à simplifier la gestion de vos colocations ?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Rejoignez des centaines de propriétaires qui font confiance à Rentify
          </p>
          <Link
            to="/register"
            className="bg-white text-primary-600 px-8 py-3 rounded-lg text-lg font-medium hover:bg-gray-100 transition-colors inline-flex items-center space-x-2"
          >
            <span>Créer un compte gratuit</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;