<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PropertyController;
use App\Http\Controllers\Api\ReportController;

// Routes publiques (sans authentification)
Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
});

// Routes protégées (avec authentification JWT)
Route::middleware('auth:api')->group(function () {
    Route::prefix('auth')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/profile', [AuthController::class, 'profile']);
        Route::post('/refresh', [AuthController::class, 'refresh']);
    });
    Route::apiResource('properties', PropertyController::class);
    Route::get('dashboard', [ReportController::class, 'dashboard']);
    Route::get('reports/properties', [ReportController::class, 'propertiesReport']);
    Route::get('reports/late-payments', [ReportController::class, 'latePaymentsReport']);
    Route::get('reports/expiring-contracts', [ReportController::class, 'expiringContractsReport']);
    Route::get('reports/financial', [ReportController::class, 'financialReport']);
    
});