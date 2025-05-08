<?php

namespace Database\Factories;

use App\Models\Quiz;
use App\Models\User;
use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

class QuizFactory extends Factory
{
    protected $model = Quiz::class;

    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence,
            'description' => $this->faker->paragraph,
            'user_id' => User::factory(),
            'category_id' => Category::factory(),
            'time_limit' => $this->faker->numberBetween(10, 60),
            'passing_score' => $this->faker->numberBetween(50, 90),
            'total_questions' => $this->faker->numberBetween(5, 20),
            'is_published' => $this->faker->boolean,
        ];
    }
} 