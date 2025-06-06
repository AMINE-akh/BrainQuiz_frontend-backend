<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Quiz;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Quiz::where('id', 1)->update(['is_published' => true]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Quiz::where('id', 1)->update(['is_published' => false]);
    }
}; 