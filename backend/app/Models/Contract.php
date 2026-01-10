<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contract extends Model
{
    use HasFactory;

    protected $fillable = [
        'property_id',
        'tenant_id',
        'contract_number',
        'start_date',
        'end_date',
        'monthly_rent',
        'deposit',
        'charges',
        'auto_renewal',
        'status',
        'terms',
        'signed_file',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'monthly_rent' => 'decimal:2',
        'deposit' => 'decimal:2',
        'charges' => 'decimal:2',
        'auto_renewal' => 'boolean',
    ];

    /**
     * Relation : Un contrat appartient à une propriété
     */
    public function property()
    {
        return $this->belongsTo(Property::class);
    }

    /**
     * Relation : Un contrat appartient à un locataire
     */
    public function tenant()
    {
        return $this->belongsTo(Tenant::class);
    }

    /**
     * Relation : Un contrat génère plusieurs paiements
     */
    public function payments()
    {
        return $this->hasMany(Payment::class);
    }

    /**
     * Vérifier si le contrat est expiré
     */
    public function isExpired()
    {
        return $this->end_date < now();
    }

    /**
     * Générer un numéro de contrat unique
     */
    public static function generateContractNumber()
    {
        $year = date('Y');
        $lastContract = self::whereYear('created_at', $year)
            ->orderBy('id', 'desc')
            ->first();
        
        $number = $lastContract ? intval(substr($lastContract->contract_number, -4)) + 1 : 1;
        
        return 'CT-' . $year . '-' . str_pad($number, 4, '0', STR_PAD_LEFT);
    }
}