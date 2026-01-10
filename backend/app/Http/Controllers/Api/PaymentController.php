<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PaymentController extends Controller
{
    /**
     * Lister tous les paiements
     */
    public function index(Request $request)
    {
        $query = Payment::with(['contract.property', 'tenant'])
            ->whereHas('contract.property', function ($q) {
                $q->where('user_id', auth()->id());
            });

        // Filtres
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        if ($request->has('contract_id')) {
            $query->where('contract_id', $request->contract_id);
        }

        if ($request->has('tenant_id')) {
            $query->where('tenant_id', $request->tenant_id);
        }

        // Paiements en retar
        if ($request->has('late')) {
        $query->where('status', 'en_attente')
            ->where('due_date', '<', now());
    }

    $payments = $query->latest()->paginate(15);

    return response()->json([
        'success' => true,
        'payments' => $payments
    ], 200);
}

/**
 * Créer un nouveau paiement
 */
public function store(Request $request)
{
    $validator = Validator::make($request->all(), [
        'contract_id' => 'required|exists:contracts,id',
        'tenant_id' => 'required|exists:tenants,id',
        'amount' => 'required|numeric|min:0',
        'due_date' => 'required|date',
        'payment_date' => 'nullable|date',
        'status' => 'nullable|in:en_attente,paye,en_retard,annule',
        'payment_method' => 'nullable|in:especes,virement,cheque,carte,autre',
        'transaction_reference' => 'nullable|string',
        'notes' => 'nullable|string',
    ]);

    if ($validator->fails()) {
        return response()->json([
            'success' => false,
            'errors' => $validator->errors()
        ], 422);
    }

    // Vérifier que le contrat appartient au propriétaire
    $contract = \App\Models\Contract::with('property')
        ->where('id', $request->contract_id)
        ->first();

    if (!$contract || $contract->property->user_id !== auth()->id()) {
        return response()->json([
            'success' => false,
            'message' => 'Accès non autorisé'
        ], 403);
    }

    // Générer le numéro de paiement
    $paymentNumber = Payment::generatePaymentNumber();

    $payment = Payment::create(array_merge(
        $request->all(),
        ['payment_number' => $paymentNumber]
    ));

    return response()->json([
        'success' => true,
        'message' => 'Paiement enregistré avec succès',
        'payment' => $payment->load(['contract', 'tenant'])
    ], 201);
}

/**
 * Afficher un paiement
 */
public function show($id)
{
    $payment = Payment::with(['contract.property', 'tenant'])->find($id);

    if (!$payment) {
        return response()->json([
            'success' => false,
            'message' => 'Paiement non trouvé'
        ], 404);
    }

    // Vérifier les permissions
    if ($payment->contract->property->user_id !== auth()->id()) {
        return response()->json([
            'success' => false,
            'message' => 'Accès non autorisé'
        ], 403);
    }

    return response()->json([
        'success' => true,
        'payment' => $payment
    ], 200);
}

/**
 * Modifier un paiement
 */
public function update(Request $request, $id)
{
    $payment = Payment::find($id);

    if (!$payment) {
        return response()->json([
            'success' => false,
            'message' => 'Paiement non trouvé'
        ], 404);
    }

    // Vérifier les permissions
    if ($payment->contract->property->user_id !== auth()->id()) {
        return response()->json([
            'success' => false,
            'message' => 'Accès non autorisé'
        ], 403);
    }

    $validator = Validator::make($request->all(), [
        'amount' => 'sometimes|numeric|min:0',
        'due_date' => 'sometimes|date',
        'payment_date' => 'nullable|date',
        'status' => 'nullable|in:en_attente,paye,en_retard,annule',
        'payment_method' => 'nullable|in:especes,virement,cheque,carte,autre',
        'transaction_reference' => 'nullable|string',
        'notes' => 'nullable|string',
    ]);

    if ($validator->fails()) {
        return response()->json([
            'success' => false,
            'errors' => $validator->errors()
        ], 422);
    }

    $payment->update($request->all());

    return response()->json([
        'success' => true,
        'message' => 'Paiement mis à jour avec succès',
        'payment' => $payment->load(['contract', 'tenant'])
    ], 200);
}

/**
 * Supprimer un paiement
 */
public function destroy($id)
{
    $payment = Payment::find($id);

    if (!$payment) {
        return response()->json([
            'success' => false,
            'message' => 'Paiement non trouvé'
        ], 404);
    }

    // Vérifier les permissions
    if ($payment->contract->property->user_id !== auth()->id()) {
        return response()->json([
            'success' => false,
            'message' => 'Accès non autorisé'
        ], 403);
    }

    $payment->delete();

    return response()->json([
        'success' => true,
        'message' => 'Paiement supprimé avec succès'
    ], 200);
}

/**
 * Marquer un paiement comme payé
 */
public function markAsPaid(Request $request, $id)
{
    $payment = Payment::find($id);

    if (!$payment) {
        return response()->json([
            'success' => false,
            'message' => 'Paiement non trouvé'
        ], 404);
    }

    // Vérifier les permissions
    if ($payment->contract->property->user_id !== auth()->id()) {
        return response()->json([
            'success' => false,
            'message' => 'Accès non autorisé'
        ], 403);
    }

    $payment->update([
        'status' => 'paye',
        'payment_date' => now(),
        'payment_method' => $request->payment_method ?? 'autre',
        'transaction_reference' => $request->transaction_reference,
    ]);

    return response()->json([
        'success' => true,
        'message' => 'Paiement marqué comme payé',
        'payment' => $payment
    ], 200);
}

/**
 * Statistiques des paiements
 */
public function stats()
{
    $userId = auth()->id();

    $totalPaid = Payment::whereHas('contract.property', function ($q) use ($userId) {
        $q->where('user_id', $userId);
    })->where('status', 'paye')->sum('amount');

    $totalPending = Payment::whereHas('contract.property', function ($q) use ($userId) {
        $q->where('user_id', $userId);
    })->where('status', 'en_attente')->sum('amount');

    $totalLate = Payment::whereHas('contract.property', function ($q) use ($userId) {
        $q->where('user_id', $userId);
    })->where('status', 'en_attente')
      ->where('due_date', '<', now())
      ->sum('amount');

    $lateCount = Payment::whereHas('contract.property', function ($q) use ($userId) {
        $q->where('user_id', $userId);
    })->where('status', 'en_attente')
      ->where('due_date', '<', now())
      ->count();

    return response()->json([
        'success' => true,
        'stats' => [
            'total_paid' => $totalPaid,
            'total_pending' => $totalPending,
            'total_late' => $totalLate,
            'late_count' => $lateCount,
        ]
    ], 200);
}
}