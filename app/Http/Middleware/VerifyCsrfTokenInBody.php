<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class VerifyCsrfTokenInBody
{
    public function handle(Request $request, Closure $next)
    {
        $csrfToken = $request->input('csrfToken');

        if ($csrfToken && $csrfToken === csrf_token()) {
            return $next($request);
        }

        return response()->json(['error' => 'Invalid CSRF token'], 403);
    }
}

