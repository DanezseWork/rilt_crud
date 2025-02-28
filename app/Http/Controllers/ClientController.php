<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 10);
        $search = $request->input('search');
    
        // Query builder with optional search filtering
        $query = Client::latest();
    
        if (!empty($search)) {
            $query->where('name', 'LIKE', "%$search%")
                  ->orWhere('email', 'LIKE', "%$search%")
                  ->orWhere('phone', 'LIKE', "%$search%");
        }
    
        $clients = $query->paginate($perPage)->withQueryString();
        $clientCount = $query->count(); // Count after filtering
    
        return inertia('Clients', [
            'clients' => [
                'data' => $clients->items(),
                'count' => $clientCount,
                'meta' => [
                    'current_page' => $clients->currentPage(),
                    'last_page' => $clients->lastPage(),
                    'per_page' => $clients->perPage(),
                    'total' => $clients->total(),
                    'links' => array_values($clients->toArray()['links']), // Force conversion to an array
                ]
            ]
        ]);
    }




    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fields = $request->validate([
            'name' => 'required|string|max:255',
        'email' => 'required|email|unique:clients,email',
        'age' => 'nullable|integer|min:0',
        'phone' => 'nullable|string|max:20',
        'occupation' => 'nullable|string|max:255',
    ]);
        
        Client::create($fields);
        
        return redirect('/clients')->with('message', 'Client created.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Client $client)
    {
        return inertia('Show', ['client' => $client]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Client $client)
    {
        return inertia('Edit', ['client' => $client]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Client $client)
    {
        $fields = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:clients,email,' . $client->id,
            'age' => 'nullable|integer|min:0',
            'phone' => 'nullable|string|max:20',
            'occupation' => 'nullable|string|max:255',
        ]);
        
        $client->update($fields);
        
        return redirect('/clients')->with('message', 'Client updated.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Client $client)
    {
        $client->delete();
        return redirect('/clients')->with('message', 'Client deleted.');
    }
}
