import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

export const fetchProperties = createAsyncThunk(
  'properties/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/properties');
      // Retourner directement response.data si l'API ne retourne pas "properties"
      return response.data.properties || response.data || [];
    } catch (error) {
      console.error('Erreur API:', error);
      return rejectWithValue(error.response?.data || { message: 'Erreur de chargement' });
    }
  }
);

export const fetchPropertyById = createAsyncThunk(
  'properties/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/properties/${id}`);
      return response.data.property || response.data || null;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Erreur de chargement' });
    }
  }
);

export const createProperty = createAsyncThunk(
  'properties/create',
  async (propertyData, { rejectWithValue }) => {
    try {
      const response = await api.post('/properties', propertyData);
      return response.data.property || response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Erreur de création' });
    }
  }
);

const propertySlice = createSlice({
  name: 'properties',
  initialState: {
    items: [],
    selectedProperty: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearSelectedProperty: (state) => {
      state.selectedProperty = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.loading = false;
        // S'assurer que items est toujours un array
        state.items = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Erreur de chargement';
        state.items = []; // Reset en cas d'erreur
      })
      .addCase(fetchPropertyById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPropertyById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProperty = action.payload;
      })
      .addCase(fetchPropertyById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Erreur de chargement';
      })
      .addCase(createProperty.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export const { clearSelectedProperty, clearError } = propertySlice.actions;
export default propertySlice.reducer;