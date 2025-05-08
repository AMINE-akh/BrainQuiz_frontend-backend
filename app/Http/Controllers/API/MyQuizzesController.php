<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Quiz;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;

class MyQuizzesController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->get('per_page', 10);
        $page = $request->get('page', 1);
        
        // Cache key includes user ID and pagination parameters
        $cacheKey = "user_{$request->user()->id}_quizzes_page_{$page}_per_page_{$perPage}";
        
        return Cache::remember($cacheKey, now()->addMinutes(5), function () use ($perPage) {
            return Quiz::where('user_id', Auth::id())
                ->with(['category', 'questions'])
                ->withCount('questions')
                ->latest()
                ->paginate($perPage);
        });
    }
} 