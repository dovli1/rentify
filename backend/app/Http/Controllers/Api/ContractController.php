<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Contract;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ContractController extends Controller
{
    /**
     * Lister tous les contrats
     */
    public function index(Request $request)
    {
        $query = Contract::with(['property:id,title,address', 'tenant:id,first_name,last_name,email'])
            ->whereHas('property', function ($q) {
                $q->where('user_id', auth()->id());
            });

        // Filtres
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        if ($request->has('property_id')) {
            $query->where('property_id', $request->property_id);
        }

        if ($request->has('tenant_id')) {
            $query->where('tenant_id', $request->tenant_id);
        }

        $contracts = $query->latest()->paginate(10);

        return response()->json([
            'success' => true,
            'contracts' => $contracts
        ], 200);
    }

    /**
     * Créer un nouveau contrat
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'property_id' => 'required|exists:properties,id',
            'tenant_id' => 'required|exists:tenants,id',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'monthly_rent' => 'required|numeric|min:0',
            'deposit' => 'nullable|numeric|min:0',
            'charges' => 'nullable|numeric|min:0',
            'auto_renewal' => 'nullable|boolean',
            'terms' => 'nullable|string',
            'signed_file' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        // Vérifier que la propriété appartient au propriétaire
        $property = \App\Models\Property::where('id', $request->property_id)
            ->where('user_id', auth()->id())
            ->first();

        if (!$property) {
            return response()->json([
                'success' => false,
                'message' => 'Cette propriété ne vous appartient pas'
            ], 403);
        }

        // Générer le numéro de contrat
        $contractNumber = Contract::generateContractNumber();

        $contract = Contract::create(array_merge(
            $request->all(),
            ['contract_number' => $contractNumber]
        ));

        return response()->json([
            'success' => true,
            'message' => 'Contrat créé avec succès',
            'contract' => $contract->load(['property', 'tenant'])
        ], 201);
    }

    /**
     * Afficher un contrat
     */
    public function show($id)
    {
        $contract = Contract::with(['property', 'tenant', 'payments'])->find($id);

        if (!$contract) {
            return response()->json([
                'success' => false,
                'message' => 'Contrat non trouvé'
            ], 404);
        }

        // Vérifier les permissions
        if ($contract->property->user_id !== auth()->id()) {
            return response()->json([
                'success' => false,
                'message' => 'Accès non autorisé'
            ], 403);
        }

        return response()->json([
            'success' => true,
            'contract' => $contract
        ], 200);
    }

    /**
     * Modifier un contrat
     */
    public function update(Request $request, $id)
    {
        $contract = Contract::find($id);

        if (!$contract) {
            return response()->json([
                'success' => false,
                'message' => 'Contrat non trouvé'
            ], 404);
        }

        // Vérifier les permissions
        if ($contract->property->user_id !== auth()->id()) {
            return response()->json([
                'success' => false,
                'message' => 'Accès non autorisé'
            ], 403);
        }

        $validator = Validator::make($request->all(), [
            'start_date' => 'sometimes|date',
            'end_date' => 'sometimes|date|after:start_date',
            'monthly_rent' => 'sometimes|numeric|min:0',
            'deposit' => 'nullable|numeric|min:0',
            'charges' => 'nullable|numeric|min:0',
            'auto_renewal' => 'nullable|boolean',
            'status' => 'nullable|in:actif,expire,resilie,en_attente',
            'terms' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $contract->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Contrat mis à jour avec succès',
            'contract' => $contract->load(['property', 'tenant'])
        ], 200);
    }

    /**
     * Supprimer un contrat
     */
    public function destroy($id)
    {
        $contract = Contract::find($id);

        if (!$contract) {
            return response()->json([
                'success' => false,
                'message' => 'Contrat non trouvé'
            ], 404);
        }

        // Vérifier les permissions
        if ($contract->property->user_id !== auth()->id()) {
            return response()->json([
                'success' => false,
                'message' => 'Accès non autorisé'
            ], 403);
        }

        $contract->delete();

        return response()->json([
            'success' => true,
            'message' => 'Contrat supprimé avec succès'
        ], 200);
    }

    /**
     * Renouveler un contrat
     */
    public function renew(Request $request, $id)
    {
        $contract = Contract::find($id);

        if (!$contract) {
            return response()->json([
                'success' => false,
                'message' => 'Contrat non trouvé'
            ], 404);
        }

        // Vérifier les permissions
        if ($contract->property->user_id !== auth()->id()) {
            return response()->json([
                'success' => false,
                'message' => 'Accès non autorisé'
            ], 403);
        }

        $validator = Validator::make($request->all(), [
            'new_end_date' => 'required|date|after:' . $contract->end_date,
            'new_monthly_rent' => 'nullable|numeric|min:0',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $contract->update([
            'end_date' => $request->new_end_date,
            'monthly_rent' => $request->new_monthly_rent ?? $contract->monthly_rent,
            'status' => 'actif',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Contrat renouvelé avec succès',
            'contract' => $contract
        ], 200);
    }
}