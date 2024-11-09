<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductRefrigeratorController;
use App\Http\Controllers\HeaderTitleContent;
use App\Http\Controllers\HeaderProductContent;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful;

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
Route::middleware([EnsureFrontendRequestsAreStateful::class])->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('product-refrigerators', ProductRefrigeratorController::class);

// Login
Route::get('/csrf-token', function () {
    return response()->json(['csrfToken' => csrf_token()]);
});
Route::post('/signup', [UserController::class, 'signUp']);
Route::post('/login', [UserController::class, 'login']);

// Navbar

// Header Title

Route::get('/header-title', [HeaderTitleContent::class, 'index']);

Route::post('/header-title', [HeaderTitleContent::class, 'store']);

Route::post('/header-title/{id}', [HeaderTitleContent::class, 'update']);

Route::delete('/header-title/{id}', [HeaderTitleContent::class, 'destroy']);

// Header Product

Route::get('/header-product', [HeaderProductContent::class, 'index']);

Route::post('/header-product', [HeaderProductContent::class, 'store']);

Route::post('/header-product/{id}', [HeaderProductContent::class, 'update']);

Route::delete('/header-product/{id}', [HeaderProductContent::class, 'destroy']);

// List Product

Route::get('/products', [ProductRefrigeratorController::class, 'index']);

Route::post('/products', [ProductRefrigeratorController::class, 'store']);

Route::delete('/products/{id}', [ProductRefrigeratorController::class, 'destroy']);

Route::post('/products/{id}', [ProductRefrigeratorController::class, 'update']);
