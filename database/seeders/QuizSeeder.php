<?php

namespace Database\Seeders;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Seeder;
use App\Models\Quiz;
use App\Models\Question;
use App\Models\Option;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class QuizSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create a default user
        $userId = DB::table('users')->insertGetId([
            'name' => 'Default User',
            'email' => 'default@example.com',
            'password' => Hash::make('password'),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // History Quiz
        $historyQuizId = DB::table('quizzes')->insertGetId([
            'title' => 'World History Quiz',
            'description' => 'Test your knowledge of major historical events and figures.',
            'category_id' => 1, // History
            'user_id' => $userId,
            'time_limit' => 600, // 10 minutes
            'total_questions' => 5,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $historyQuestions = [
            [
                'quiz_id' => $historyQuizId,
                'question_text' => 'Who was the first President of the United States?',
                'question_type' => 'multiple_choice',
                'options' => [
                    ['text' => 'Thomas Jefferson', 'is_correct' => false],
                    ['text' => 'George Washington', 'is_correct' => true],
                    ['text' => 'Abraham Lincoln', 'is_correct' => false],
                    ['text' => 'John Adams', 'is_correct' => false],
                ],
            ],
            [
                'quiz_id' => $historyQuizId,
                'question_text' => 'In which year did World War II end?',
                'question_type' => 'multiple_choice',
                'options' => [
                    ['text' => '1943', 'is_correct' => false],
                    ['text' => '1944', 'is_correct' => false],
                    ['text' => '1945', 'is_correct' => true],
                    ['text' => '1946', 'is_correct' => false],
                ],
            ],
            [
                'quiz_id' => $historyQuizId,
                'question_text' => 'Who painted the Mona Lisa?',
                'question_type' => 'multiple_choice',
                'options' => [
                    ['text' => 'Vincent van Gogh', 'is_correct' => false],
                    ['text' => 'Pablo Picasso', 'is_correct' => false],
                    ['text' => 'Leonardo da Vinci', 'is_correct' => true],
                    ['text' => 'Michelangelo', 'is_correct' => false],
                ],
            ],
            [
                'quiz_id' => $historyQuizId,
                'question_text' => 'Which ancient civilization built the Machu Picchu?',
                'question_type' => 'multiple_choice',
                'options' => [
                    ['text' => 'Aztecs', 'is_correct' => false],
                    ['text' => 'Mayans', 'is_correct' => false],
                    ['text' => 'Incas', 'is_correct' => true],
                    ['text' => 'Olmecs', 'is_correct' => false],
                ],
            ],
            [
                'quiz_id' => $historyQuizId,
                'question_text' => 'Who was the first woman to win a Nobel Prize?',
                'question_type' => 'multiple_choice',
                'options' => [
                    ['text' => 'Marie Curie', 'is_correct' => true],
                    ['text' => 'Mother Teresa', 'is_correct' => false],
                    ['text' => 'Jane Addams', 'is_correct' => false],
                    ['text' => 'Rosalind Franklin', 'is_correct' => false],
                ],
            ],
        ];

        // Science Quiz
        $scienceQuizId = DB::table('quizzes')->insertGetId([
            'title' => 'Basic Science Quiz',
            'description' => 'Test your knowledge of fundamental scientific concepts.',
            'category_id' => 2, // Science
            'user_id' => $userId,
            'time_limit' => 600,
            'total_questions' => 5,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $scienceQuestions = [
            [
                'quiz_id' => $scienceQuizId,
                'question_text' => 'What is the chemical symbol for gold?',
                'question_type' => 'multiple_choice',
                'options' => [
                    ['text' => 'Ag', 'is_correct' => false],
                    ['text' => 'Au', 'is_correct' => true],
                    ['text' => 'Fe', 'is_correct' => false],
                    ['text' => 'Cu', 'is_correct' => false],
                ],
            ],
            [
                'quiz_id' => $scienceQuizId,
                'question_text' => 'What is the hardest natural substance on Earth?',
                'question_type' => 'multiple_choice',
                'options' => [
                    ['text' => 'Gold', 'is_correct' => false],
                    ['text' => 'Iron', 'is_correct' => false],
                    ['text' => 'Diamond', 'is_correct' => true],
                    ['text' => 'Platinum', 'is_correct' => false],
                ],
            ],
            [
                'quiz_id' => $scienceQuizId,
                'question_text' => 'What is the main component of the Sun?',
                'question_type' => 'multiple_choice',
                'options' => [
                    ['text' => 'Helium', 'is_correct' => false],
                    ['text' => 'Hydrogen', 'is_correct' => true],
                    ['text' => 'Oxygen', 'is_correct' => false],
                    ['text' => 'Carbon', 'is_correct' => false],
                ],
            ],
            [
                'quiz_id' => $scienceQuizId,
                'question_text' => 'What is the process by which plants make their food?',
                'question_type' => 'multiple_choice',
                'options' => [
                    ['text' => 'Respiration', 'is_correct' => false],
                    ['text' => 'Photosynthesis', 'is_correct' => true],
                    ['text' => 'Digestion', 'is_correct' => false],
                    ['text' => 'Fermentation', 'is_correct' => false],
                ],
            ],
            [
                'quiz_id' => $scienceQuizId,
                'question_text' => 'What is the SI unit of electric current?',
                'question_type' => 'multiple_choice',
                'options' => [
                    ['text' => 'Volt', 'is_correct' => false],
                    ['text' => 'Watt', 'is_correct' => false],
                    ['text' => 'Ampere', 'is_correct' => true],
                    ['text' => 'Ohm', 'is_correct' => false],
                ],
            ],
        ];

        // Mathematics Quiz
        $mathQuizId = DB::table('quizzes')->insertGetId([
            'title' => 'Basic Mathematics Quiz',
            'description' => 'Test your knowledge of fundamental mathematical concepts.',
            'category_id' => 3, // Mathematics
            'user_id' => $userId,
            'time_limit' => 600,
            'total_questions' => 5,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $mathQuestions = [
            [
                'quiz_id' => $mathQuizId,
                'question_text' => 'What is the value of π (pi) to two decimal places?',
                'question_type' => 'multiple_choice',
                'options' => [
                    ['text' => '3.14', 'is_correct' => true],
                    ['text' => '3.16', 'is_correct' => false],
                    ['text' => '3.12', 'is_correct' => false],
                    ['text' => '3.18', 'is_correct' => false],
                ],
            ],
            [
                'quiz_id' => $mathQuizId,
                'question_text' => 'What is the square root of 144?',
                'question_type' => 'multiple_choice',
                'options' => [
                    ['text' => '12', 'is_correct' => true],
                    ['text' => '14', 'is_correct' => false],
                    ['text' => '16', 'is_correct' => false],
                    ['text' => '18', 'is_correct' => false],
                ],
            ],
            [
                'quiz_id' => $mathQuizId,
                'question_text' => 'What is 15% of 200?',
                'question_type' => 'multiple_choice',
                'options' => [
                    ['text' => '20', 'is_correct' => false],
                    ['text' => '25', 'is_correct' => false],
                    ['text' => '30', 'is_correct' => true],
                    ['text' => '35', 'is_correct' => false],
                ],
            ],
            [
                'quiz_id' => $mathQuizId,
                'question_text' => 'What is the sum of the angles in a triangle?',
                'question_type' => 'multiple_choice',
                'options' => [
                    ['text' => '90 degrees', 'is_correct' => false],
                    ['text' => '180 degrees', 'is_correct' => true],
                    ['text' => '270 degrees', 'is_correct' => false],
                    ['text' => '360 degrees', 'is_correct' => false],
                ],
            ],
            [
                'quiz_id' => $mathQuizId,
                'question_text' => 'What is the next number in the sequence: 2, 4, 8, 16, ...?',
                'question_type' => 'multiple_choice',
                'options' => [
                    ['text' => '24', 'is_correct' => false],
                    ['text' => '32', 'is_correct' => true],
                    ['text' => '30', 'is_correct' => false],
                    ['text' => '28', 'is_correct' => false],
                ],
            ],
        ];

        // Language Quiz
        $languageQuizId = DB::table('quizzes')->insertGetId([
            'title' => 'English Language Quiz',
            'description' => 'Test your knowledge of English grammar and vocabulary.',
            'category_id' => 4, // Language
            'user_id' => $userId,
            'time_limit' => 600,
            'total_questions' => 5,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $languageQuestions = [
            [
                'quiz_id' => $languageQuizId,
                'question_text' => 'Which of the following is a correct sentence?',
                'question_type' => 'multiple_choice',
                'options' => [
                    ['text' => 'Me and him went to the store', 'is_correct' => false],
                    ['text' => 'He and I went to the store', 'is_correct' => true],
                    ['text' => 'Him and I went to the store', 'is_correct' => false],
                    ['text' => 'Me and he went to the store', 'is_correct' => false],
                ],
            ],
            [
                'quiz_id' => $languageQuizId,
                'question_text' => 'What is the past tense of "write"?',
                'question_type' => 'multiple_choice',
                'options' => [
                    ['text' => 'wrote', 'is_correct' => true],
                    ['text' => 'written', 'is_correct' => false],
                    ['text' => 'writed', 'is_correct' => false],
                    ['text' => 'writing', 'is_correct' => false],
                ],
            ],
            [
                'quiz_id' => $languageQuizId,
                'question_text' => 'Which word is a synonym for "happy"?',
                'question_type' => 'multiple_choice',
                'options' => [
                    ['text' => 'Sad', 'is_correct' => false],
                    ['text' => 'Joyful', 'is_correct' => true],
                    ['text' => 'Angry', 'is_correct' => false],
                    ['text' => 'Tired', 'is_correct' => false],
                ],
            ],
            [
                'quiz_id' => $languageQuizId,
                'question_text' => 'What is the correct plural form of "child"?',
                'question_type' => 'multiple_choice',
                'options' => [
                    ['text' => 'childs', 'is_correct' => false],
                    ['text' => 'children', 'is_correct' => true],
                    ['text' => 'childes', 'is_correct' => false],
                    ['text' => 'childrens', 'is_correct' => false],
                ],
            ],
            [
                'quiz_id' => $languageQuizId,
                'question_text' => 'Which sentence uses the correct punctuation?',
                'question_type' => 'multiple_choice',
                'options' => [
                    ['text' => 'What time is it.', 'is_correct' => false],
                    ['text' => 'What time is it!', 'is_correct' => false],
                    ['text' => 'What time is it?', 'is_correct' => true],
                    ['text' => 'What time is it,', 'is_correct' => false],
                ],
            ],
        ];

        // Psychology Quiz
        $psychologyQuizId = DB::table('quizzes')->insertGetId([
            'title' => 'Introduction to Psychology',
            'description' => 'Test your knowledge of basic psychological concepts.',
            'category_id' => 5, // Psychology
            'user_id' => $userId,
            'time_limit' => 600,
            'total_questions' => 5,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $psychologyQuestions = [
            [
                'quiz_id' => $psychologyQuizId,
                'question_text' => 'Who is considered the father of psychoanalysis?',
                'question_type' => 'multiple_choice',
                'options' => [
                    ['text' => 'Carl Jung', 'is_correct' => false],
                    ['text' => 'Sigmund Freud', 'is_correct' => true],
                    ['text' => 'B.F. Skinner', 'is_correct' => false],
                    ['text' => 'Ivan Pavlov', 'is_correct' => false],
                ],
            ],
            [
                'quiz_id' => $psychologyQuizId,
                'question_text' => 'What is classical conditioning?',
                'question_type' => 'multiple_choice',
                'options' => [
                    ['text' => 'Learning through rewards and punishments', 'is_correct' => false],
                    ['text' => 'Learning through association of stimuli', 'is_correct' => true],
                    ['text' => 'Learning through observation', 'is_correct' => false],
                    ['text' => 'Learning through trial and error', 'is_correct' => false],
                ],
            ],
            [
                'quiz_id' => $psychologyQuizId,
                'question_text' => 'What is the term for a relatively permanent change in behavior due to experience?',
                'question_type' => 'multiple_choice',
                'options' => [
                    ['text' => 'Motivation', 'is_correct' => false],
                    ['text' => 'Learning', 'is_correct' => true],
                    ['text' => 'Perception', 'is_correct' => false],
                    ['text' => 'Memory', 'is_correct' => false],
                ],
            ],
            [
                'quiz_id' => $psychologyQuizId,
                'question_text' => 'What is the term for the process of encoding, storing, and retrieving information?',
                'question_type' => 'multiple_choice',
                'options' => [
                    ['text' => 'Learning', 'is_correct' => false],
                    ['text' => 'Memory', 'is_correct' => true],
                    ['text' => 'Perception', 'is_correct' => false],
                    ['text' => 'Cognition', 'is_correct' => false],
                ],
            ],
            [
                'quiz_id' => $psychologyQuizId,
                'question_text' => 'What is the term for a state of mental or emotional strain?',
                'question_type' => 'multiple_choice',
                'options' => [
                    ['text' => 'Anxiety', 'is_correct' => false],
                    ['text' => 'Depression', 'is_correct' => false],
                    ['text' => 'Stress', 'is_correct' => true],
                    ['text' => 'Phobia', 'is_correct' => false],
                ],
            ],
        ];

        // General Knowledge Quiz
        $generalQuizId = DB::table('quizzes')->insertGetId([
            'title' => 'General Knowledge Quiz',
            'description' => 'Test your knowledge across various topics.',
            'category_id' => 6, // General Knowledge
            'user_id' => $userId,
            'time_limit' => 600,
            'total_questions' => 5,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $generalQuestions = [
            [
                'quiz_id' => $generalQuizId,
                'question_text' => 'What is the capital of France?',
                'question_type' => 'multiple_choice',
                'options' => [
                    ['text' => 'London', 'is_correct' => false],
                    ['text' => 'Berlin', 'is_correct' => false],
                    ['text' => 'Paris', 'is_correct' => true],
                    ['text' => 'Madrid', 'is_correct' => false],
                ],
            ],
            [
                'quiz_id' => $generalQuizId,
                'question_text' => 'Which planet is known as the Red Planet?',
                'question_type' => 'multiple_choice',
                'options' => [
                    ['text' => 'Venus', 'is_correct' => false],
                    ['text' => 'Mars', 'is_correct' => true],
                    ['text' => 'Jupiter', 'is_correct' => false],
                    ['text' => 'Saturn', 'is_correct' => false],
                ],
            ],
            [
                'quiz_id' => $generalQuizId,
                'question_text' => 'What is the largest ocean on Earth?',
                'question_type' => 'multiple_choice',
                'options' => [
                    ['text' => 'Atlantic Ocean', 'is_correct' => false],
                    ['text' => 'Indian Ocean', 'is_correct' => false],
                    ['text' => 'Pacific Ocean', 'is_correct' => true],
                    ['text' => 'Arctic Ocean', 'is_correct' => false],
                ],
            ],
            [
                'quiz_id' => $generalQuizId,
                'question_text' => 'Who wrote "Romeo and Juliet"?',
                'question_type' => 'multiple_choice',
                'options' => [
                    ['text' => 'Charles Dickens', 'is_correct' => false],
                    ['text' => 'William Shakespeare', 'is_correct' => true],
                    ['text' => 'Jane Austen', 'is_correct' => false],
                    ['text' => 'Mark Twain', 'is_correct' => false],
                ],
            ],
            [
                'quiz_id' => $generalQuizId,
                'question_text' => 'What is the currency of Japan?',
                'question_type' => 'multiple_choice',
                'options' => [
                    ['text' => 'Yuan', 'is_correct' => false],
                    ['text' => 'Won', 'is_correct' => false],
                    ['text' => 'Yen', 'is_correct' => true],
                    ['text' => 'Ringgit', 'is_correct' => false],
                ],
            ],
        ];

        // Insert all questions and their options
        $allQuestions = array_merge(
            $historyQuestions,
            $scienceQuestions,
            $mathQuestions,
            $languageQuestions,
            $psychologyQuestions,
            $generalQuestions
        );

        foreach ($historyQuestions as $questionData) {
            $questionId = DB::table('questions')->insertGetId([
                'quiz_id' => $historyQuizId,
                'question_text' => $questionData['question_text'],
                'question_type' => $questionData['question_type'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            foreach ($questionData['options'] as $option) {
                DB::table('options')->insert([
                    'question_id' => $questionId,
                    'text' => $option['text'],
                    'is_correct' => $option['is_correct'],
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }

        foreach ($scienceQuestions as $questionData) {
            $questionId = DB::table('questions')->insertGetId([
                'quiz_id' => $scienceQuizId,
                'question_text' => $questionData['question_text'],
                'question_type' => $questionData['question_type'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            foreach ($questionData['options'] as $option) {
                DB::table('options')->insert([
                    'question_id' => $questionId,
                    'text' => $option['text'],
                    'is_correct' => $option['is_correct'],
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }

        foreach ($mathQuestions as $questionData) {
            $questionId = DB::table('questions')->insertGetId([
                'quiz_id' => $mathQuizId,
                'question_text' => $questionData['question_text'],
                'question_type' => $questionData['question_type'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            foreach ($questionData['options'] as $option) {
                DB::table('options')->insert([
                    'question_id' => $questionId,
                    'text' => $option['text'],
                    'is_correct' => $option['is_correct'],
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }

        foreach ($languageQuestions as $questionData) {
            $questionId = DB::table('questions')->insertGetId([
                'quiz_id' => $languageQuizId,
                'question_text' => $questionData['question_text'],
                'question_type' => $questionData['question_type'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            foreach ($questionData['options'] as $option) {
                DB::table('options')->insert([
                    'question_id' => $questionId,
                    'text' => $option['text'],
                    'is_correct' => $option['is_correct'],
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }

        foreach ($psychologyQuestions as $questionData) {
            $questionId = DB::table('questions')->insertGetId([
                'quiz_id' => $psychologyQuizId,
                'question_text' => $questionData['question_text'],
                'question_type' => $questionData['question_type'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            foreach ($questionData['options'] as $option) {
                DB::table('options')->insert([
                    'question_id' => $questionId,
                    'text' => $option['text'],
                    'is_correct' => $option['is_correct'],
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }

        foreach ($generalQuestions as $questionData) {
            $questionId = DB::table('questions')->insertGetId([
                'quiz_id' => $generalQuizId,
                'question_text' => $questionData['question_text'],
                'question_type' => $questionData['question_type'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            foreach ($questionData['options'] as $option) {
                DB::table('options')->insert([
                    'question_id' => $questionId,
                    'text' => $option['text'],
                    'is_correct' => $option['is_correct'],
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }
}
