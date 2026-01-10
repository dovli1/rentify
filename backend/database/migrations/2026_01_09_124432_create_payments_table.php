<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('contract_id')->constrained()->onDelete('cascade');
            $table->foreignId('tenant_id')->constrained()->onDelete('cascade');
            $table->string('payment_number')->unique(); // Numéro de paiement
            $table->decimal('amount', 10, 2); // Montant
            $table->date('due_date'); // Date d'échéance
            $table->date('payment_date')->nullable(); // Date de paiement réel
            $table->enum('status', ['en_attente', 'paye', 'en_retard', 'annule'])->default('en_attente');
            $table->enum('payment_method', ['especes', 'virement', 'cheque', 'carte', 'autre'])->nullable();
            $table->string('transaction_reference')->nullable(); // Référence transaction
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};