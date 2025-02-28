<?php

namespace App\Http\Controllers;

use App\Models\Pet;
use Illuminate\Http\Request;

class PetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {


    
        return inertia('Pets');
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
        'email' => 'required|email|unique:Pets,email',
        'age' => 'nullable|integer|min:0',
        'phone' => 'nullable|string|max:20',
        'occupation' => 'nullable|string|max:255',
    ]);
        
        Pet::create($fields);
        
        return redirect('/Pets')->with('message', 'Pet created.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Pet $Pet)
    {
        return inertia('Show', ['Pet' => $Pet]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Pet $Pet)
    {
        return inertia('Edit', ['Pet' => $Pet]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Pet $Pet)
    {
        $fields = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:Pets,email,' . $Pet->id,
            'age' => 'nullable|integer|min:0',
            'phone' => 'nullable|string|max:20',
            'occupation' => 'nullable|string|max:255',
        ]);
        
        $Pet->update($fields);
        
        return redirect('/Pets')->with('message', 'Pet updated.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pet $Pet)
    {
        $Pet->delete();
        return redirect('/Pets')->with('message', 'Pet deleted.');
    }
}
