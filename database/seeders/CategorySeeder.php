<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'History',
                'slug' => 'history',
                'icon' => 'history',
                'color' => '#FF5722',
                'description' => 'Test your knowledge of historical events, figures, and periods.'
            ],
            [
                'name' => 'Science',
                'slug' => 'science',
                'icon' => 'science',
                'color' => '#2196F3',
                'description' => 'Explore questions about biology, chemistry, physics, and more.'
            ],
            [
                'name' => 'Mathematics',
                'slug' => 'mathematics',
                'icon' => 'calculate',
                'color' => '#4CAF50',
                'description' => 'Challenge yourself with mathematical problems and concepts.'
            ],
            [
                'name' => 'Language',
                'slug' => 'language',
                'icon' => 'translate',
                'color' => '#9C27B0',
                'description' => 'Test your understanding of grammar, vocabulary, and language rules.'
            ],
            [
                'name' => 'Psychology',
                'slug' => 'psychology',
                'icon' => 'psychology',
                'color' => '#E91E63',
                'description' => 'Learn about human behavior, mental processes, and psychological theories.'
            ],
            [
                'name' => 'General Knowledge',
                'slug' => 'general-knowledge',
                'icon' => 'lightbulb',
                'color' => '#FFC107',
                'description' => 'A mix of questions from various fields to test your overall knowledge.'
            ]
        ];

        foreach ($categories as $category) {
            DB::table('categories')->insert([
                'name' => $category['name'],
                'slug' => $category['slug'],
                'icon' => $category['icon'],
                'color' => $category['color'],
                'description' => $category['description'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
