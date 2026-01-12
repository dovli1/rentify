import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Home, Users, DollarSign, FileText, Plus, TrendingUp } from 'lucide-react';
import { fetchProperties } from '../store/propertySlice';
import PropertyCard from '../components/properties/PropertyCard';

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { items: properties } = useSelector((state) => state.properties);

  useEffect(() => {
    dispatch(fetchProperties());
  }, [dispatch]);

  const stats = [
    {
      title: 'Total Properties',
      value: properties.length,
      icon: Home,
      color: 'bg-blue-500',
      trend: '+12%',
    },
    {
      title: 'Active Tenants',
      value: '24',
      icon: Users,
      color: 'bg-green-500',
      trend: '+5%',
    },
    {
      title: 'Monthly Revenue',
      value: '€45,000',
      icon: DollarSign,
      color: 'bg-purple-500',
      trend: '+8%',
    },
    {
      title: 'Pending Payments',
      value: '3',
      icon: FileText,
      color: 'bg-orange-500',
      trend: '-2%',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {user?.name}! 👋
            </h1>
            <p className="text-gray-600 mt-1">Here's what's happening with your properties</p>
          </div>
          <Link
            to="/properties/add"
            className="mt-4 sm:mt-0 inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
          >
            <Plus className="w-5 h-5" />
            <span>Add Property</span>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex items-center space-x-1 text-green-600 text-sm font-semibold">
                  <TrendingUp className="w-4 h-4" />
                  <span>{stat.trend}</span>
                </div>
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.title}</h3>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Recent Properties */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Your Properties</h2>
            <Link
              to="/properties"
              className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
            >
              View All →
            </Link>
          </div>

          {properties.length === 0 ? (
            <div className="text-center py-12">
              <Home className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Properties Yet
              </h3>
              <p className="text-gray-600 mb-6">
                Start by adding your first property to get started
              </p>
              <Link
                to="/properties/add"
                className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all"
              >
                <Plus className="w-5 h-5" />
                <span>Add Your First Property</span>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.slice(0, 3).map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/tenants"
            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all group"
          >
            <Users className="w-10 h-10 text-blue-600 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">Manage Tenants</h3>
            <p className="text-gray-600 text-sm">View and manage all your tenants</p>
          </Link>

          <Link
            to="/payments"
            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all group"
          >
            <DollarSign className="w-10 h-10 text-green-600 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">Track Payments</h3>
            <p className="text-gray-600 text-sm">Monitor rent payments and invoices</p>
          </Link>

          <Link
            to="/reports"
            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all group"
          >
            <FileText className="w-10 h-10 text-purple-600 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">View Reports</h3>
            <p className="text-gray-600 text-sm">Generate detailed financial reports</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;