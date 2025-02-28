<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\PetController;
use Illuminate\Support\Facades\Route;

Route::get("/", [DashboardController::class, 'index'])->name('dashboard');

Route::resource('clients', ClientController::class);

Route::resource('pets', PetController::class);
