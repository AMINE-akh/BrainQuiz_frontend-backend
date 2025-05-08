<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Quiz;
use App\Models\QuizAttempt;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        
        // Get user's quiz attempts
        $attempts = QuizAttempt::where('user_id', $user->id)
            ->with('quiz')
            ->latest()
            ->take(5)
            ->get();

        // Calculate statistics
        $totalScore = QuizAttempt::where('user_id', $user->id)
            ->sum('score');
            
        $quizzesCompleted = QuizAttempt::where('user_id', $user->id)
            ->count();
            
        $averageTime = QuizAttempt::where('user_id', $user->id)
            ->avg('time_taken');

        // Format recent activity
        $recentActivity = $attempts->map(function ($attempt) {
            return [
                'id' => $attempt->id,
                'title' => $attempt->quiz->title,
                'score' => $attempt->score,
                'date' => $attempt->created_at->format('M d, Y'),
            ];
        });

        return response()->json([
            'stats' => [
                'totalScore' => $totalScore,
                'quizzesCompleted' => $quizzesCompleted,
                'averageTime' => round($averageTime) . 'm',
            ],
            'recentActivity' => $recentActivity,
        ]);
    }
} 