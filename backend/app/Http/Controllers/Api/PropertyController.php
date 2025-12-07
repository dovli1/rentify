<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Property;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PropertyController extends Controller
{
    /**
     * Lister toutes les propriétés (avec filtre par propriétaire)
     */
    public function index(Request $request)
    {
        $query = Property::with('owner:id,name,email');

        // Si on veut filtrer par propriétaire connecté
        if ($request->has('my_properties')) {
            $query->where('user_id', auth()->id());
        }

        // Filtres optionnels
        if ($request->has('city')) {
            $query->where('city', 'like', '%' . $request->city . '%');
        }

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        $properties = $query->latest()->paginate(10);

        return response()->json([
            'success' => true,
            'properties' => $properties
        ], 200);
    }

    /**
     * Créer une nouvelle propriété
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'address' => 'required|string',
            'city' => 'required|string',
            'postal_code' => 'required|string',
            'total_rooms' => 'required|integer|min:1',
            'available_rooms' => 'required|integer|min:0',
            'price_per_room' => 'required|numeric|min:0',
            'amenities' => 'nullable|array',
            'photos' => 'nullable|array',
            'photos.*' => 'nullable|string',
            'status' => 'nullable|in:disponible,complete,maintenance',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $property = Property::create([
            'user_id' => auth()->id(),
            'title' => $request->title,
            'description' => $request->description,
            'address' => $request->address,
            'city' => $request->city,
            'postal_code' => $request->postal_code,
            'total_rooms' => $request->total_rooms,
            'available_rooms' => $request->available_rooms,
            'price_per_room' => $request->price_per_room,
            'amenities' => $request->amenities,
            'photos' => $request->photos,
            'status' => $request->status ?? 'disponible',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Propriété créée avec succès',
            'property' => $property
        ], 201);
    }

    /**
     * Afficher une propriété spécifique
     */
    public function show($id)
    {
        $property = Property::with('owner:id,name,email,phone')->find($id);

        if (!$property) {
            return response()->json([
                'success' => false,
                'message' => 'Propriété non trouvée'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'property' => $property
        ], 200);
    }

    /**
     * Modifier une propriété
     */
    public function update(Request $request, $id)
    {
        $property = Property::find($id);

        if (!$property) {
            return response()->json([
                'success' => false,
                'message' => 'Propriété non trouvée'
            ], 404);
        }

        // Vérifier que c'est bien le propriétaire
        if ($property->user_id !== auth()->id()) {
            return response()->json([
                'success' => false,
                'message' => 'Vous n\'êtes pas autorisé à modifier cette propriété'
            ], 403);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'address' => 'sometimes|required|string',
            'city' => 'sometimes|required|string',
            'postal_code' => 'sometimes|required|string',
            'total_rooms' => 'sometimes|required|integer|min:1',
            'available_rooms' => 'sometimes|required|integer|min:0',
            'price_per_room' => 'sometimes|required|numeric|min:0',
            'amenities' => 'nullable|array',
            'photos' => 'nullable|array',
            'status' => 'nullable|in:disponible,complete,maintenance',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $property->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Propriété mise à jour avec succès',
            'property' => $property
        ], 200);
    }

    /**
     * Supprimer une propriété
     */
    public function destroy($id)
    {
        $property = Property::find($id);

        if (!$property) {
            return response()->json([
                'success' => false,
                'message' => 'Propriété non trouvée'
            ], 404);
        }

        // Vérifier que c'est bien le propriétaire
        if ($property->user_id !== auth()->id()) {
            return response()->json([
                'success' => false,
                'message' => 'Vous n\'êtes pas autorisé à supprimer cette propriété'
            ], 403);
        }

        $property->delete();

        return response()->json([
            'success' => true,
            'message' => 'Propriété supprimée avec succès'
        ], 200);
    }
}