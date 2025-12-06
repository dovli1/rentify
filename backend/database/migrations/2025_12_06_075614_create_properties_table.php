<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('properties', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('address');
            $table->string('city');
            $table->string('postal_code');
            $table->integer('total_rooms');
            $table->integer('available_rooms')->default(0);
            $table->decimal('price_per_room', 10, 2);
            $table->json('amenities')->nullable(); // équipements
            $table->json('photos')->nullable();
            $table->enum('status', ['disponible', 'complete', 'maintenance'])->default('disponible');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('properties');
    }
};