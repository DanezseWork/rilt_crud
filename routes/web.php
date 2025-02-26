<?php

use App\Http\Controllers\ClientController;
use App\Http\Controllers\DashboardController;
use App\Models\Client;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


// Route::get('/', function () {
//     return inertia('Home');
// });
Route::get("/", [DashboardController::class, 'index'])->name('dashboard');

Route::resource('clients', ClientController::class);
