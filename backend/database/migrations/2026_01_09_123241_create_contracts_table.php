<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('contracts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('property_id')->constrained()->onDelete('cascade');
            $table->foreignId('tenant_id')->constrained()->onDelete('cascade');
            $table->string('contract_number')->unique(); // Numéro de contrat
            $table->date('start_date'); // Date de début
            $table->date('end_date'); // Date de fin
            $table->decimal('monthly_rent', 10, 2); // Loyer mensuel
            $table->decimal('deposit', 10, 2)->nullable(); // Caution
            $table->decimal('charges', 10, 2)->default(0); // Charges
            $table->boolean('auto_renewal')->default(false); // Renouvellement auto
            $table->enum('status', ['actif', 'expire', 'resilie', 'en_attente'])->default('actif');
            $table->text('terms')->nullable(); // Conditions du contrat
            $table->string('signed_file')->nullable(); // Fichier contrat signé
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('contracts');
    }
};