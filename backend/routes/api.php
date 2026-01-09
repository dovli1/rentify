<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PropertyController;
use App\Http\Controllers\Api\MessageController;

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
    Route::get('conversations', [MessageController::class, 'conversations']);
    Route::get('messages/{userId}', [MessageController::class, 'messages']);
    Route::post('messages/send', [MessageController::class, 'send']);
    Route::get('messages-unread-count', [MessageController::class, 'unreadCount']);
    Route::post('messages/{id}/mark-read', [MessageController::class, 'markAsRead']);
    Route::delete('messages/{id}', [MessageController::class, 'destroy']);
});