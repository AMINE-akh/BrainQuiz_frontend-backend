<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::table('categories')
            ->where('name', 'General Knowledge')
            ->update([
                'name' => 'Know It All',
                'slug' => 'know-it-all',
                'updated_at' => now()
            ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::table('categories')
            ->where('name', 'Know It All')
            ->update([
                'name' => 'General Knowledge',
                'slug' => 'general-knowledge',
                'updated_at' => now()
            ]);
    }
};
