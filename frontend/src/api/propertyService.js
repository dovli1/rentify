import api from './axios';

export const propertyService = {
  // Récupérer toutes les propriétés
  getAllProperties: async () => {
    const response = await api.get('/properties');
    return response.data;
  },

  // Récupérer mes propriétés
  getMyProperties: async () => {
    const response = await api.get('/properties?my_properties=1');
    return response.data;
  },

  // Récupérer une propriété
  getProperty: async (id) => {
    const response = await api.get(`/properties/${id}`);
    return response.data;
  },

  // Créer une propriété
  createProperty: async (propertyData) => {
    const response = await api.post('/properties', propertyData);
    return response.data;
  },

  // Modifier une propriété
  updateProperty: async (id, propertyData) => {
    const response = await api.put(`/properties/${id}`, propertyData);
    return response.data;
  },

  // Supprimer une propriété
  deleteProperty: async (id) => {
    const response = await api.delete(`/properties/${id}`);
    return response.data;
  },
};