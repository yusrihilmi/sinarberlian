<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductRefrigeratorController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::apiResource('product-refrigerators', ProductRefrigeratorController::class);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->group(function () {
    Route::resource('product-refrigerators', Admin\ProductRefrigeratorController::class);
});

Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->middleware('auth:sanctum');

Route::get('/products', [ProductRefrigeratorController::class, 'index']);

Route::post('/products', [ProductRefrigeratorController::class, 'store']);

Route::delete('/products/{id}', [ProductRefrigeratorController::class, 'destroy']);

Route::post('/products/{id}', [ProductRefrigeratorController::class, 'update']);

Route::post('/login', [AuthenticatedSessionController::class, 'store']);
