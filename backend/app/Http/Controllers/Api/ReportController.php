<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Property;
use App\Models\Tenant;
use App\Models\Contract;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
    /**
     * Dashboard global
     */
    public function dashboard()
    {
        $userId = auth()->id();

        // Statistiques propriétés
        $totalProperties = Property::where('user_id', $userId)->count();
        $availableRooms = Property::where('user_id', $userId)->sum('available_rooms');
        $totalRooms = Property::where('user_id', $userId)->sum('total_rooms');
        $occupancyRate = $totalRooms > 0 ? (($totalRooms - $availableRooms) / $totalRooms) * 100 : 0;

        // Statistiques locataires
        $totalTenants = Tenant::whereHas('property', function ($q) use ($userId) {
            $q->where('user_id', $userId);
        })->count();

        $activeTenants = Tenant::whereHas('property', function ($q) use ($userId) {
            $q->where('user_id', $userId);
        })->where('status', 'actif')->count();

        // Statistiques contrats
        $activeContracts = Contract::whereHas('property', function ($q) use ($userId) {
            $q->where('user_id', $userId);
        })->where('status', 'actif')->count();

        $expiringContracts = Contract::whereHas('property', function ($q) use ($userId) {
            $q->where('user_id', $userId);
        })->where('status', 'actif')
          ->whereBetween('end_date', [now(), now()->addDays(30)])
          ->count();

        // Statistiques paiements
        $totalRevenue = Payment::whereHas('contract.property', function ($q) use ($userId) {
            $q->where('user_id', $userId);
        })->where('status', 'paye')->sum('amount');

        $pendingPayments = Payment::whereHas('contract.property', function ($q) use ($userId) {
            $q->where('user_id', $userId);
        })->where('status', 'en_attente')->sum('amount');

        $latePayments = Payment::whereHas('contract.property', function ($q) use ($userId) {
            $q->where('user_id', $userId);
        })->where('status', 'en_attente')
          ->where('due_date', '<', now())
          ->sum('amount');

        $latePaymentsCount = Payment::whereHas('contract.property', function ($q) use ($userId) {
            $q->where('user_id', $userId);
        })->where('status', 'en_attente')
          ->where('due_date', '<', now())
          ->count();

        // Revenus mensuels (6 derniers mois)
        $monthlyRevenue = Payment::whereHas('contract.property', function ($q) use ($userId) {
            $q->where('user_id', $userId);
        })
        ->where('status', 'paye')
        ->where('payment_date', '>=', now()->subMonths(6))
        ->select(
            DB::raw('YEAR(payment_date) as year'),
            DB::raw('MONTH(payment_date) as month'),
            DB::raw('SUM(amount) as total')
        )
        ->groupBy('year', 'month')
        ->orderBy('year', 'desc')
        ->orderBy('month', 'desc')
        ->get();

        return response()->json([
            'success' => true,
            'dashboard' => [
                'properties' => [
                    'total' => $totalProperties,
                    'total_rooms' => $totalRooms,
                    'available_rooms' => $availableRooms,
                    'occupancy_rate' => round($occupancyRate, 2),
                ],
                'tenants' => [
                    'total' => $totalTenants,
                    'active' => $activeTenants,
                ],
                'contracts' => [
                    'active' => $activeContracts,
                    'expiring_soon' => $expiringContracts,
                ],
                'payments' => [
                    'total_revenue' => $totalRevenue,
                    'pending_amount' => $pendingPayments,
                    'late_amount' => $latePayments,
                    'late_count' => $latePaymentsCount,
                ],
                'monthly_revenue' => $monthlyRevenue,
            ]
        ], 200);
    }

    /**
     * Rapport des propriétés
     */
    public function propertiesReport()
    {
        $userId = auth()->id();

        $properties = Property::where('user_id', $userId)
            ->withCount(['tenants as tenants_count'])
            ->with(['contracts' => function ($q) {
                $q->where('status', 'actif');
            }])
            ->get()
            ->map(function ($property) {
                $occupiedRooms = $property->total_rooms - $property->available_rooms;
                $occupancyRate = $property->total_rooms > 0 
                    ? ($occupiedRooms / $property->total_rooms) * 100 
                    : 0;

                $monthlyRevenue = $property->contracts->sum('monthly_rent');

                return [
                    'id' => $property->id,
                    'title' => $property->title,
                    'address' => $property->address,
                    'city' => $property->city,
                    'total_rooms' => $property->total_rooms,
                    'occupied_rooms' => $occupiedRooms,
                    'available_rooms' => $property->available_rooms,
                    'occupancy_rate' => round($occupancyRate, 2),
                    'monthly_revenue' => $monthlyRevenue,
                    'status' => $property->status,
                ];
            });

        return response()->json([
            'success' => true,
            'report' => $properties
        ], 200);
    }

    /**
     * Rapport des paiements en retard
     */
    public function latePaymentsReport()
    {
        $userId = auth()->id();

        $latePayments = Payment::with(['contract.property', 'tenant'])
            ->whereHas('contract.property', function ($q) use ($userId) {
                $q->where('user_id', $userId);
            })
            ->where('status', 'en_attente')
            ->where('due_date', '<', now())
            ->orderBy('due_date', 'asc')
            ->get()
            ->map(function ($payment) {
                $daysLate = now()->diffInDays($payment->due_date);
                
                return [
                    'id' => $payment->id,
                    'payment_number' => $payment->payment_number,
                    'tenant' => [
                        'id' => $payment->tenant->id,
                        'name' => $payment->tenant->first_name . ' ' . $payment->tenant->last_name,
                        'email' => $payment->tenant->email,
                        'phone' => $payment->tenant->phone,
                    ],
                    'property' => [
                        'id' => $payment->contract->property->id,
                        'title' => $payment->contract->property->title,
                    ],
                    'amount' => $payment->amount,
                    'due_date' => $payment->due_date,
                    'days_late' => $daysLate,
                ];
            });

        $totalLate = $latePayments->sum('amount');

        return response()->json([
            'success' => true,
            'report' => [
                'late_payments' => $latePayments,
                'total_amount' => $totalLate,
                'count' => $latePayments->count(),
            ]
        ], 200);
    }

    /**
     * Rapport des contrats expirant bientôt
     */
    public function expiringContractsReport(Request $request)
    {
        $userId = auth()->id();
        $days = $request->get('days', 30); // Par défaut 30 jours

        $expiringContracts = Contract::with(['property', 'tenant'])
            ->whereHas('property', function ($q) use ($userId) {
                $q->where('user_id', $userId);
            })
            ->where('status', 'actif')
            ->whereBetween('end_date', [now(), now()->addDays($days)])
            ->orderBy('end_date', 'asc')
            ->get()
            ->map(function ($contract) {
                $daysUntilExpiry = now()->diffInDays($contract->end_date, false);
                
                return [
                    'id' => $contract->id,
                    'contract_number' => $contract->contract_number,
                    'tenant' => [
                        'id' => $contract->tenant->id,
                        'name' => $contract->tenant->first_name . ' ' . $contract->tenant->last_name,
                        'email' => $contract->tenant->email,
                        'phone' => $contract->tenant->phone,
                    ],
                    'property' => [
                        'id' => $contract->property->id,
                        'title' => $contract->property->title,
                    ],
                    'start_date' => $contract->start_date,
                    'end_date' => $contract->end_date,
                    'days_until_expiry' => $daysUntilExpiry,
                    'monthly_rent' => $contract->monthly_rent,
                    'auto_renewal' => $contract->auto_renewal,
                ];
            });

        return response()->json([
            'success' => true,
            'report' => [
                'expiring_contracts' => $expiringContracts,
                'count' => $expiringContracts->count(),
            ]
        ], 200);
    }

    /**
     * Rapport financier détaillé
     */
    public function financialReport(Request $request)
    {
        $userId = auth()->id();
        $year = $request->get('year', date('Y'));
        $month = $request->get('month');

        $query = Payment::whereHas('contract.property', function ($q) use ($userId) {
            $q->where('user_id', $userId);
        })->whereYear('due_date', $year);

        if ($month) {
            $query->whereMonth('due_date', $month);
        }

        $payments = $query->with(['contract.property', 'tenant'])->get();

        $totalExpected = $payments->sum('amount');
        $totalPaid = $payments->where('status', 'paye')->sum('amount');
        $totalPending = $payments->where('status', 'en_attente')->sum('amount');
        $totalLate = $payments->filter(function ($payment) {
            return $payment->status === 'en_attente' && $payment->due_date < now();
        })->sum('amount');

        // Détails par propriété
        $byProperty = $payments->groupBy('contract.property.id')
            ->map(function ($propertyPayments) {
                $property = $propertyPayments->first()->contract->property;
                
                return [
                    'property_id' => $property->id,
                    'property_title' => $property->title,
                    'total_expected' => $propertyPayments->sum('amount'),
                    'total_paid' => $propertyPayments->where('status', 'paye')->sum('amount'),
                    'total_pending' => $propertyPayments->where('status', 'en_attente')->sum('amount'),
                ];
            })->values();

        return response()->json([
            'success' => true,
            'report' => [
                'period' => [
                    'year' => $year,
                    'month' => $month,
                ],
                'summary' => [
                    'total_expected' => $totalExpected,
                    'total_paid' => $totalPaid,
                    'total_pending' => $totalPending,
                    'total_late' => $totalLate,
                    'collection_rate' => $totalExpected > 0 ? round(($totalPaid / $totalExpected) * 100, 2) : 0,
                ],
                'by_property' => $byProperty,
            ]
        ], 200);
    }
}