<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tenants', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // Lien avec users (compte locataire)
            $table->foreignId('property_id')->nullable()->constrained()->onDelete('set null'); // Propriété louée
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email')->unique();
            $table->string('phone');
            $table->date('birth_date')->nullable();
            $table->string('id_card_number')->nullable(); // Numéro carte d'identité
            $table->string('id_card_file')->nullable(); // Fichier carte d'identité
            $table->text('additional_documents')->nullable(); // JSON pour autres documents
            $table->enum('status', ['actif', 'inactif', 'expulse'])->default('actif');
            $table->date('move_in_date')->nullable(); // Date d'entrée
            $table->date('move_out_date')->nullable(); // Date de sortie
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tenants');
    }
};