<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Quiz;
use App\Models\Category;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;

class QuizTest extends TestCase
{
    use WithFaker;

    protected $user;
    protected $category;

    protected function setUp(): void
    {
        parent::setUp();
        
        // Create test user and category
        $this->user = User::factory()->create();
        $this->category = Category::factory()->create();
    }

    public function test_user_can_create_quiz()
    {
        $quizData = [
            'title' => $this->faker->sentence,
            'description' => $this->faker->paragraph,
            'category_id' => $this->category->id,
            'time_limit' => 30,
            'passing_score' => 70,
            'total_questions' => 10,
            'questions' => [
                [
                    'text' => $this->faker->sentence,
                    'type' => 'multiple_choice',
                    'options' => [
                        [
                            'text' => $this->faker->sentence,
                            'is_correct' => true
                        ],
                        [
                            'text' => $this->faker->sentence,
                            'is_correct' => false
                        ]
                    ]
                ]
            ]
        ];

        $response = $this->actingAs($this->user)
            ->postJson('/api/quizzes', $quizData);

        $response->assertStatus(201)
            ->assertJsonStructure([
                'id',
                'title',
                'description',
                'category_id',
                'time_limit',
                'passing_score',
                'total_questions',
                'created_at',
                'updated_at'
            ]);

        $this->assertDatabaseHas('quizzes', [
            'title' => $quizData['title'],
            'user_id' => $this->user->id,
            'total_questions' => $quizData['total_questions']
        ]);
    }

    public function test_user_can_view_their_quizzes()
    {
        // Create some quizzes for the user
        Quiz::factory()->count(3)->create([
            'user_id' => $this->user->id,
            'category_id' => $this->category->id
        ]);

        $response = $this->actingAs($this->user)
            ->getJson('/api/my-quizzes');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'data',
                'current_page',
                'per_page',
                'total'
            ])
            ->assertJsonCount(3, 'data');
    }

    public function test_user_cannot_create_quiz_with_invalid_data()
    {
        $quizData = [
            'title' => '', // Invalid: empty title
            'description' => $this->faker->paragraph,
            'category_id' => 999, // Invalid: non-existent category
            'time_limit' => -1, // Invalid: negative time limit
            'passing_score' => 101, // Invalid: score > 100
            'total_questions' => 0, // Invalid: zero questions
        ];

        $response = $this->actingAs($this->user)
            ->postJson('/api/quizzes', $quizData);

        $response->assertStatus(422)
            ->assertJsonValidationErrors([
                'title',
                'category_id',
                'time_limit',
                'passing_score',
                'total_questions'
            ]);
    }

    public function test_user_can_delete_their_quiz()
    {
        $quiz = Quiz::factory()->create([
            'user_id' => $this->user->id,
            'category_id' => $this->category->id
        ]);

        $response = $this->actingAs($this->user)
            ->deleteJson("/api/quizzes/{$quiz->id}");

        $response->assertStatus(204);
        $this->assertDatabaseMissing('quizzes', ['id' => $quiz->id]);
    }

    public function test_user_cannot_delete_other_users_quiz()
    {
        $otherUser = User::factory()->create();
        $quiz = Quiz::factory()->create([
            'user_id' => $otherUser->id,
            'category_id' => $this->category->id
        ]);

        $response = $this->actingAs($this->user)
            ->deleteJson("/api/quizzes/{$quiz->id}");

        $response->assertStatus(403);
        $this->assertDatabaseHas('quizzes', ['id' => $quiz->id]);
    }
} 