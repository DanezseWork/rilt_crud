<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        $clientCount = Client::count();

        return Inertia::render('Dashboard', [
            'clientCount' => $clientCount
        ]);
    }
   
}
