import { useState, useEffect } from 'react';
import { propertyService } from '../api/propertyService';
import { toast } from 'sonner';
import { Plus, X, MapPin, Home, DollarSign, Trash2, Edit } from 'lucide-react';

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    address: '',
    city: '',
    postal_code: '',
    total_rooms: '',
    available_rooms: '',
    price_per_room: '',
    amenities: [],
    status: 'disponible',
  });

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    try {
      setLoading(true);
      const data = await propertyService.getMyProperties();
      setProperties(data.properties?.data || []);
    } catch (error) {
      toast.error('Erreur lors du chargement des propriétés');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (parseInt(formData.available_rooms) > parseInt(formData.total_rooms)) {
      toast.error('Le nombre de chambres disponibles ne peut pas dépasser le total');
      return;
    }

    try {
      if (editMode && editId) {
        await propertyService.updateProperty(editId, formData);
        toast.success('Propriété modifiée avec succès !');
      } else {
        await propertyService.createProperty(formData);
        toast.success('Propriété créée avec succès !');
      }

      setShowForm(false);
      setEditMode(false);
      setEditId(null);
      resetForm();
      loadProperties();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erreur lors de l\'opération');
      console.error(error);
    }
  };

  const handleEdit = (property) => {
    setFormData({
      title: property.title,
      description: property.description || '',
      address: property.address,
      city: property.city,
      postal_code: property.postal_code,
      total_rooms: property.total_rooms,
      available_rooms: property.available_rooms,
      price_per_room: property.price_per_room,
      amenities: property.amenities || [],
      status: property.status,
    });
    setEditId(property.id);
    setEditMode(true);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette propriété ?')) {
      return;
    }

    try {
      await propertyService.deleteProperty(id);
      toast.success('Propriété supprimée avec succès');
      loadProperties();
    } catch (error) {
      toast.error('Erreur lors de la suppression');
      console.error(error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      address: '',
      city: '',
      postal_code: '',
      total_rooms: '',
      available_rooms: '',
      price_per_room: '',
      amenities: [],
      status: 'disponible',
    });
  };

  const cancelForm = () => {
    setShowForm(false);
    setEditMode(false);
    setEditId(null);
    resetForm();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Mes Propriétés</h1>
            <p className="text-gray-600 mt-1">
              {properties.length} {properties.length > 1 ? 'propriétés' : 'propriété'}
            </p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            {showForm ? <X className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
            <span>{showForm ? 'Annuler' : 'Ajouter une propriété'}</span>
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {editMode ? 'Modifier la propriété' : 'Nouvelle propriété'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Titre *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Appartement T4 Centre Ville"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ville *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Paris"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Adresse *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="15 Rue de la République"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Code postal *
                  </label>
                  <input
                    type="text"
                    name="postal_code"
                    value={formData.postal_code}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="75001"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prix par chambre (€) *
                  </label>
                  <input
                    type="number"
                    name="price_per_room"
                    value={formData.price_per_room}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="550"
                    required
                    min="0"
                    step="0.01"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre total de chambres *
                  </label>
                  <input
                    type="number"
                    name="total_rooms"
                    value={formData.total_rooms}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="4"
                    required
                    min="1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Chambres disponibles *
                  </label>
                  <input
                    type="number"
                    name="available_rooms"
                    value={formData.available_rooms}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="2"
                    required
                    min="0"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    rows="3"
                    placeholder="Description de la propriété..."
                  />
                </div>
              </div>

              <div className="flex space-x-4 mt-6">
                <button
                  type="submit"
                  className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  {editMode ? 'Modifier' : 'Créer la propriété'}
                </button>
                <button
                  type="button"
                  onClick={cancelForm}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Properties Grid */}
        {properties.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <Home className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Aucune propriété pour le moment
            </h3>
            <p className="text-gray-600 mb-6">
              Commencez par ajouter votre première propriété !
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Ajouter une propriété
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <div
                key={property.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{property.title}</h3>
                  
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span className="text-sm">{property.city}</span>
                  </div>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {property.description || 'Pas de description'}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-primary-600 font-bold">
                      <DollarSign className="h-5 w-5 mr-1" />
                      <span>{property.price_per_room}€</span>
                      <span className="text-sm text-gray-600 ml-1">/ chambre</span>
                    </div>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      property.status === 'disponible' ? 'bg-green-100 text-green-800' :
                      property.status === 'complete' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {property.status}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Home className="h-4 w-4 mr-1" />
                      <span>{property.total_rooms} chambres</span>
                    </div>
                    <span className="font-medium text-green-600">
                      {property.available_rooms} disponibles
                    </span>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(property)}
                      className="flex-1 flex items-center justify-center space-x-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Edit className="h-4 w-4" />
                      <span>Modifier</span>
                    </button>
                    <button
                      onClick={() => handleDelete(property.id)}
                      className="flex-1 flex items-center justify-center space-x-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span>Supprimer</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Properties;