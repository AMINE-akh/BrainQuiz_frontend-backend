<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\QuizController;
use App\Http\Controllers\API\QuestionController;
use App\Http\Controllers\API\OptionController;
use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\API\DashboardController;
use App\Http\Controllers\API\MyQuizzesController;
use App\Http\Controllers\Auth\AuthController;

// Rate limiting middleware
Route::middleware(['throttle:60,1'])->group(function () {
    // Auth Routes
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);

    // Public Routes
    Route::get('/categories', [CategoryController::class, 'index']);
    Route::get('/categories/{category}', [CategoryController::class, 'show']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/user', [AuthController::class, 'user']);
        Route::post('/logout', [AuthController::class, 'logout']);

        // Dashboard
        Route::get('/dashboard', [DashboardController::class, 'index']);

        // My Quizzes
        Route::get('/my-quizzes', [MyQuizzesController::class, 'index']);

        // Quiz Routes
        Route::apiResource('quizzes', QuizController::class);
        Route::get('quizzes/{quiz}/start', [QuizController::class, 'start']);
        Route::get('quizzes/{quiz}/questions', [QuizController::class, 'questions']);

        // Question Routes
        Route::apiResource('questions', QuestionController::class);

        // Option Routes
        Route::apiResource('options', OptionController::class);
    });
});
