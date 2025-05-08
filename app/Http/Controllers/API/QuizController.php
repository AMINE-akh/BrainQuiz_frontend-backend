<?php

namespace App\Http\Controllers\API;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Request;
use App\Models\Quiz;
use App\Models\Question;
use App\Models\Category;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;

class QuizController extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    public function __construct()
    {
        $this->middleware('auth:sanctum', ['except' => ['index', 'show']]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        Log::info('Quiz index called with params:', $request->all());
        
        $query = Quiz::with(['category', 'questions', 'user'])
            ->where('is_published', true);
        
        if ($request->has('category_id')) {
            $categoryId = $request->category_id;
            Log::info('Filtering by category_id:', ['category_id' => $categoryId]);
            $query->where('category_id', $categoryId);
        }
        
        $quizzes = $query->get();
        Log::info('Quizzes found:', ['count' => $quizzes->count()]);
        
        return $quizzes;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category_id' => 'required|exists:categories,id',
            'total_questions' => 'required|integer|min:1',
            'time_limit' => 'required|integer|min:1',
            'passing_score' => 'required|integer|min:0|max:100',
            'questions' => 'required|array|min:1',
            'questions.*.question_text' => 'required|string',
            'questions.*.question_type' => 'required|in:multiple_choice,true_false',
            'questions.*.options' => 'required_if:questions.*.question_type,multiple_choice|array|min:2',
            'questions.*.options.*.text' => 'required|string',
            'questions.*.options.*.is_correct' => 'required|boolean',
        ]);

        $quiz = Quiz::create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'category_id' => $validated['category_id'],
            'total_questions' => $validated['total_questions'],
            'time_limit' => $validated['time_limit'],
            'passing_score' => $validated['passing_score'],
            'user_id' => Auth::id(),
            'is_published' => false
        ]);

        foreach ($validated['questions'] as $questionData) {
            $question = $quiz->questions()->create([
                'question_text' => $questionData['question_text'],
                'question_type' => $questionData['question_type']
            ]);

            if ($questionData['question_type'] === 'multiple_choice') {
                foreach ($questionData['options'] as $optionData) {
                    $question->options()->create([
                        'text' => $optionData['text'],
                        'is_correct' => $optionData['is_correct']
                    ]);
                }
            }
        }

        return response()->json($quiz->load(['category', 'questions.options']), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $quiz = Quiz::with(['category', 'questions' => function($query) {
                $query->with('options')->orderBy('id');
            }])->findOrFail($id);

            // Allow access if quiz is published OR if user is the owner
            if (!$quiz->is_published && $quiz->user_id !== Auth::id()) {
                return response()->json(['message' => 'This quiz is not published yet'], 403);
            }

            return $quiz;
        } catch (\Exception $e) {
            Log::error('Error in QuizController@show:', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            return response()->json(['message' => 'An error occurred while fetching the quiz'], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $quiz = Quiz::findOrFail($id);

        if ($quiz->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category_id' => 'required|exists:categories,id',
            'total_questions' => 'required|integer|min:1',
            'time_limit' => 'required|integer|min:1',
            'passing_score' => 'required|integer|min:0|max:100',
            'is_published' => 'boolean'
        ]);

        $quiz->update($validated);
        return $quiz->load(['category', 'questions.options']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $quiz = Quiz::findOrFail($id);

        if ($quiz->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $quiz->delete();
        return response()->noContent();
    }

    /**
     * Get all questions for a specific quiz.
     */
    public function questions(string $id)
    {
        $quiz = Quiz::findOrFail($id);

        if (!$quiz->is_published && $quiz->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return $quiz->questions()->with('options')->orderBy('id')->get();
    }
}
