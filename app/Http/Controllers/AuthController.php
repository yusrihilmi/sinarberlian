<?php

// app/Http/Controllers/AuthController.php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function login(Request $request)
{
    // Validate request data
    $request->validate([
        'email' => 'required|email',
        'password' => 'required',
    ]);

    // Attempt to log in
    if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
        // Authentication passed, return a token or user data
        return response()->json([
            'token' => Auth::user()->createToken('YourAppName')->plainTextToken
        ]);
    }

    // Authentication failed
    return response()->json(['message' => 'Unauthorized'], 401);
    
}



    public function signup(Request $request)
    {
        $request->validate([
            'username' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);

        $user = new User([
            'username' => $request->username,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'token' => Str::random(32), // Plaintext token
        ]);

        $user->save();

        return response()->json([
            'message' => 'User registered successfully',
            'token' => $user->token,
        ], 201);
    }

    public function logout(Request $request)
    {
        // Invalidate the token (if you're using Sanctum, Passport, or another method)
        auth()->user()->tokens->each(function ($token) {
            $token->delete();
        });

        return response()->json(['message' => 'Logged out successfully']);
    }
}
