<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class QuizRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        $rules = [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string', 'max:1000'],
            'category_id' => ['required', 'exists:categories,id'],
            'time_limit' => ['required', 'integer', 'min:1', 'max:120'],
            'passing_score' => ['required', 'integer', 'min:0', 'max:100'],
            'questions' => ['required', 'array', 'min:1'],
            'questions.*.text' => ['required', 'string', 'max:1000'],
            'questions.*.type' => ['required', Rule::in(['multiple_choice', 'true_false'])],
            'questions.*.options' => ['required_if:questions.*.type,multiple_choice', 'array', 'min:2'],
            'questions.*.options.*.text' => ['required', 'string', 'max:255'],
            'questions.*.options.*.is_correct' => ['required', 'boolean'],
            'questions.*.correct_answer' => ['required_if:questions.*.type,true_false', 'boolean'],
        ];

        // Add unique title rule for updates
        if ($this->isMethod('PUT') || $this->isMethod('PATCH')) {
            $rules['title'][] = Rule::unique('quizzes')->ignore($this->quiz);
        } else {
            $rules['title'][] = 'unique:quizzes';
        }

        return $rules;
    }

    public function messages()
    {
        return [
            'title.required' => 'The quiz title is required.',
            'title.unique' => 'A quiz with this title already exists.',
            'description.required' => 'The quiz description is required.',
            'category_id.required' => 'Please select a category.',
            'category_id.exists' => 'The selected category is invalid.',
            'time_limit.required' => 'Please specify the time limit.',
            'time_limit.min' => 'Time limit must be at least 1 minute.',
            'time_limit.max' => 'Time limit cannot exceed 120 minutes.',
            'passing_score.required' => 'Please specify the passing score.',
            'passing_score.min' => 'Passing score cannot be negative.',
            'passing_score.max' => 'Passing score cannot exceed 100.',
            'questions.required' => 'The quiz must have at least one question.',
            'questions.*.text.required' => 'Question text is required.',
            'questions.*.type.required' => 'Question type is required.',
            'questions.*.options.required_if' => 'Multiple choice questions must have options.',
            'questions.*.options.*.text.required' => 'Option text is required.',
            'questions.*.options.*.is_correct.required' => 'Please specify if this option is correct.',
            'questions.*.correct_answer.required_if' => 'Please specify the correct answer for true/false questions.',
        ];
    }
} 