<?php

namespace App\Http\Controllers;

use App\Models\HeaderProduct;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class HeaderProductContent extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return HeaderProduct::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:25',
            'link' => 'nullable|string|max:50',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            
        ]);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('images', 'public');
            $validatedData['image'] = url('storage/' . $imagePath);
        }
        $headerProduct = HeaderProduct::create($validatedData);
        return response()->json($headerProduct, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
{
    try {
        $headerProduct = HeaderProduct::find($id);
        if (!$headerProduct) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        $validatedData = $request->validate([
            'title' => 'required|string|max:25',
            'link' => 'nullable|string|max:50',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('images', 'public');
            $validatedData['image'] = url('storage/' . $imagePath);
        }

        $headerProduct->update($validatedData); // Update instead of create

        return response()->json($headerProduct, 200);
    } catch (\Exception $e) {
        \Log::error("Error updating title: " . $e->getMessage());
        return response()->json(['message' => 'Internal Server Error'], 500);
    }
}


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $headerProduct = HeaderProduct::find($id);
    
        if (!$headerProduct) {
            return response()->json(['message' => 'Product not found'], 404);
        }
    
        // Delete the product
        $headerProduct->delete();
    
        return response()->json(['message' => 'Product deleted successfully'], 200);
    }
}
