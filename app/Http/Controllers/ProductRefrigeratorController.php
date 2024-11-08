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
        // Store the image in the 'public' disk and get the path
        $imagePath = $request->file('image')->store('images', 'public');
        // Convert the image path to a full URL
        $validatedData['image'] = url('storage/' . $imagePath);
    }

    // Create the product in the database
    $product = ProductRefrigerator::create($validatedData);

    // Return the product data including the image URL
    return response()->json($product, 201);
}

public function update(Request $request, $id)
{
    try {
        $product = ProductRefrigerator::find($id);
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        // Update validation rules: title and image are required, others are optional
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string', // Make description optional
            'link-shopee' => 'nullable|string', // Make link-shopee optional
            'link-tokopedia' => 'nullable|string', // Make link-tokopedia optional
            'whatsapp' => 'nullable|string|max:15', // Make whatsapp optional
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Make image optional
        ]);

        // Only update the image if a new one is uploaded
        if ($request->hasFile('image')) {
            // Store the image in the 'public' disk and get the path
            $imagePath = $request->file('image')->store('images', 'public');
            // Convert the image path to a full URL
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
