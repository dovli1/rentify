<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tenant extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'property_id',
        'first_name',
        'last_name',
        'email',
        'phone',
        'birth_date',
        'id_card_number',
        'id_card_file',
        'additional_documents',
        'status',
        'move_in_date',
        'move_out_date',
    ];

    protected $casts = [
        'additional_documents' => 'array',
        'birth_date' => 'date',
        'move_in_date' => 'date',
        'move_out_date' => 'date',
    ];

    /**
     * Relation : Un locataire a un compte utilisateur
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relation : Un locataire loue une propriété
     */
    public function property()
    {
        return $this->belongsTo(Property::class);
    }

    /**
     * Relation : Un locataire a plusieurs contrats
     */
    public function contracts()
    {
        return $this->hasMany(Contract::class);
    }

    /**
     * Relation : Un locataire a plusieurs paiements
     */
    public function payments()
    {
        return $this->hasMany(Payment::class);
    }
}