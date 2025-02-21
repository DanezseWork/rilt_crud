<?php

use App\Http\Controllers\ClientController;
use App\Models\Client;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


// Route::get('/', function () {
//     return inertia('Home');
// });
Route::get("/", [ClientController::class, 'index']);

Route::resource('clients', ClientController::class)->except('index');
