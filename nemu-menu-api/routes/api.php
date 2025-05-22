<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\RestaurantController;
use App\Http\Controllers\API\ReviewController;
use App\Http\Controllers\API\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Public routes
Route::post('/auth/signup', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);

// Restaurant public routes
Route::get('/restaurants', [RestaurantController::class, 'index']);
Route::get('/restaurants/{id}', [RestaurantController::class, 'show']);
Route::get('/restaurants/{restaurantId}/reviews', [ReviewController::class, 'index']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    // User routes
    Route::get('/user', [UserController::class, 'show']);
    Route::patch('/user', [UserController::class, 'update']);
    Route::post('/auth/logout', [AuthController::class, 'logout']);

    // Review routes
    Route::post('/restaurants/{restaurantId}/reviews', [ReviewController::class, 'store']);

    // Admin routes
    Route::middleware('admin')->group(function () {
        Route::post('/restaurants', [RestaurantController::class, 'store']);
        Route::patch('/restaurants/{id}', [RestaurantController::class, 'update']);
        Route::delete('/restaurants/{id}', [RestaurantController::class, 'destroy']);
    });
});
