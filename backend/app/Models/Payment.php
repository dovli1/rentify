<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'contract_id',
        'tenant_id',
        'payment_number',
        'amount',
        'due_date',
        'payment_date',
        'status',
        'payment_method',
        'transaction_reference',
        'notes',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'due_date' => 'date',
        'payment_date' => 'date',
    ];

    /**
     * Relation : Un paiement appartient à un contrat
     */
    public function contract()
    {
        return $this->belongsTo(Contract::class);
    }

    /**
     * Relation : Un paiement appartient à un locataire
     */
    public function tenant()
    {
        return $this->belongsTo(Tenant::class);
    }

    /**
     * Vérifier si le paiement est en retard
     */
    public function isLate()
    {
        return $this->status === 'en_attente' && $this->due_date < now();
    }

    /**
     * Générer un numéro de paiement unique
     */
    public static function generatePaymentNumber()
    {
        $year = date('Y');
        $month = date('m');
        $lastPayment = self::whereYear('created_at', $year)
            ->whereMonth('created_at', $month)
            ->orderBy('id', 'desc')
            ->first();
        
        $number = $lastPayment ? intval(substr($lastPayment->payment_number, -4)) + 1 : 1;
        
        return 'PAY-' . $year . $month . '-' . str_pad($number, 4, '0', STR_PAD_LEFT);
    }
}