<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Tenant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TenantController extends Controller
{
    /**
     * Lister tous les locataires du propriétaire connecté
     */
    public function index(Request $request)
    {
        $query = Tenant::with(['user:id,name,email', 'property:id,title,address'])
            ->whereHas('property', function ($q) {
                $q->where('user_id', auth()->id());
            });

        // Filtres optionnels
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        if ($request->has('property_id')) {
            $query->where('property_id', $request->property_id);
        }

        $tenants = $query->latest()->paginate(10);

        return response()->json([
            'success' => true,
            'tenants' => $tenants
        ], 200);
    }

    /**
     * Créer un nouveau locataire
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'nullable|exists:users,id',
            'property_id' => 'required|exists:properties,id',
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:tenants,email',
            'phone' => 'required|string',
            'birth_date' => 'nullable|date',
            'id_card_number' => 'nullable|string',
            'id_card_file' => 'nullable|string',
            'additional_documents' => 'nullable|array',
            'status' => 'nullable|in:actif,inactif,expulse',
            'move_in_date' => 'nullable|date',
            'move_out_date' => 'nullable|date|after:move_in_date',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        // Vérifier que la propriété appartient au propriétaire connecté
        $property = \App\Models\Property::where('id', $request->property_id)
            ->where('user_id', auth()->id())
            ->first();

        if (!$property) {
            return response()->json([
                'success' => false,
                'message' => 'Cette propriété ne vous appartient pas'
            ], 403);
        }

        $tenant = Tenant::create($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Locataire créé avec succès',
            'tenant' => $tenant->load(['user', 'property'])
        ], 201);
    }

    /**
     * Afficher un locataire
     */
    public function show($id)
    {
        $tenant = Tenant::with(['user', 'property', 'contracts', 'payments'])
            ->find($id);

        if (!$tenant) {
            return response()->json([
                'success' => false,
                'message' => 'Locataire non trouvé'
            ], 404);
        }

        // Vérifier que le locataire appartient à une propriété du propriétaire
        if ($tenant->property && $tenant->property->user_id !== auth()->id()) {
            return response()->json([
                'success' => false,
                'message' => 'Accès non autorisé'
            ], 403);
        }

        return response()->json([
            'success' => true,
            'tenant' => $tenant
        ], 200);
    }

    /**
     * Modifier un locataire
     */
    public function update(Request $request, $id)
    {
        $tenant = Tenant::find($id);

        if (!$tenant) {
            return response()->json([
                'success' => false,
                'message' => 'Locataire non trouvé'
            ], 404);
        }

        // Vérifier les permissions
        if ($tenant->property && $tenant->property->user_id !== auth()->id()) {
            return response()->json([
                'success' => false,
                'message' => 'Accès non autorisé'
            ], 403);
        }

        $validator = Validator::make($request->all(), [
            'property_id' => 'sometimes|exists:properties,id',
            'first_name' => 'sometimes|string|max:255',
            'last_name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:tenants,email,' . $id,
            'phone' => 'sometimes|string',
            'birth_date' => 'nullable|date',
            'id_card_number' => 'nullable|string',
            'status' => 'nullable|in:actif,inactif,expulse',
            'move_in_date' => 'nullable|date',
            'move_out_date' => 'nullable|date|after:move_in_date',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $tenant->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Locataire mis à jour avec succès',
            'tenant' => $tenant->load(['user', 'property'])
        ], 200);
    }

    /**
     * Supprimer un locataire
     */
    public function destroy($id)
    {
        $tenant = Tenant::find($id);

        if (!$tenant) {
            return response()->json([
                'success' => false,
                'message' => 'Locataire non trouvé'
            ], 404);
        }

        // Vérifier les permissions
        if ($tenant->property && $tenant->property->user_id !== auth()->id()) {
            return response()->json([
                'success' => false,
                'message' => 'Accès non autorisé'
            ], 403);
        }

        $tenant->delete();

        return response()->json([
            'success' => true,
            'message' => 'Locataire supprimé avec succès'
        ], 200);
    }
}