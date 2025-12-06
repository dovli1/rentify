<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Property extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'description',
        'address',
        'city',
        'postal_code',
        'total_rooms',
        'available_rooms',
        'price_per_room',
        'amenities',
        'photos',
        'status',
    ];

    protected $casts = [
        'amenities' => 'array',
        'photos' => 'array',
        'price_per_room' => 'decimal:2',
    ];

    /**
     * Relation : Une propriété appartient à un propriétaire (user)
     */
    public function owner()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}