<?php

namespace App\Http\Controllers;

use App\Models\HeaderTitle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class HeaderTitleContent extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return HeaderTitle::all();
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
        ]);

        $headerTitle = HeaderTitle::create($validatedData);
        return response()->json($headerTitle, 201);
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
            $headerTitle = HeaderTitle::find($id);
            if (!$headerTitle) {
                return response()->json(['message' => 'Title not found'], 404);
            }

            $validatedData = $request->validate([
                'title' => 'required|string|max:25'
            ]);

            $headerTitle->update($validatedData);
            return response()->json(['message' => 'Title updated successfully']);
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
        $headerTitle = HeaderTitle::find($id);
    
        if (!$headerTitle) {
            return response()->json(['message' => 'Title not found'], 404);
        }
    
        // Delete the product
        $headerTitle->delete();
    
        return response()->json(['message' => 'Title deleted successfully'], 200);
    }
}
