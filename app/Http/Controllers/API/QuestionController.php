<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Question;

class QuestionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Question::with('options')->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'quiz_id' => 'required|exists:quizzes,id',
            'question_text' => 'required|string',
            'question_type' => 'required|string',
            'points' => 'required|integer',
            'image_url' => 'nullable|string',
            'audio_url' => 'nullable|string',
        ]);

        return Question::create($validated);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        return Question::with('options')->findOrFail($id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $question = Question::findOrFail($id);
        $validated = $request->validate([
            'quiz_id' => 'required|exists:quizzes,id',
            'question_text' => 'required|string',
            'question_type' => 'required|string',
            'points' => 'required|integer',
            'image_url' => 'nullable|string',
            'audio_url' => 'nullable|string',
        ]);

        $question->update($validated);
        return $question;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $question = Question::findOrFail($id);
        $question->delete();
        return response()->noContent();
    }
}
