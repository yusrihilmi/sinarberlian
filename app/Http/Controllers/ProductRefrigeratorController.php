<?php

namespace App\Http\Controllers;

use App\Models\ProductRefrigerator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductRefrigeratorController extends Controller
{
    public function index()
    {
        return ProductRefrigerator::all();
    }

    public function store(Request $request)
{
    $validatedData = $request->validate([
        'title' => 'required|string|max:255',
        'description' => 'required|string',
        'link-shopee' => 'nullable|string',
        'link-tokopedia' => 'nullable|string',
        'whatsapp' => 'nullable|string|max:15',
        'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
    ]);

    if ($request->hasFile('image')) {
        $imagePath = $request->file('image')->store('images', 'public');
        $validatedData['image'] = url('storage/' . $imagePath);
    }
    $product = ProductRefrigerator::create($validatedData);
    return response()->json($product, 201);
}

public function update(Request $request, $id)
{
    try {
        $product = ProductRefrigerator::find($id);
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'link-shopee' => 'nullable|string',
            'link-tokopedia' => 'nullable|string',
            'whatsapp' => 'nullable|string|max:15',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('images', 'public');
            $validatedData['image'] = url('storage/' . $imagePath);
        }

        $product->update($validatedData);
        return response()->json(['message' => 'Product updated successfully']);
    } catch (\Exception $e) {
        \Log::error("Error updating product: " . $e->getMessage());
        return response()->json(['message' => 'Internal Server Error'], 500);
    }
}



    public function destroy($id)
    {
        $product = ProductRefrigerator::find($id);
    
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }
    
        // Delete the product
        $product->delete();
    
        return response()->json(['message' => 'Product deleted successfully'], 200);
    }
    
}
