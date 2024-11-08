<?php

namespace App\Http\Controllers;

use App\Models\ProductRefrigerator;

class LandingPageProductRefrigeratorController extends Controller
{
    public function index()
    {
        // Fetch all products
        $products = ProductRefrigerator::all();
        
        // Return a view with the products data
        return view('landing.product_refrigerator', compact('products'));
    }
}
