<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Steps;
use App\Models\Receipe;
use App\Models\Comment;
use App\Models\Ingredient;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'gamegame'
        ])->each(function ($user) {
            Receipe::factory(10)->create([
                'user_id' => $user->id
            ])->each(function ($rec) {
                Ingredient::factory(random_int(3, 15))->create([
                    'receipe_id' => $rec->id,
                ]);
                   Steps::factory(random_int(3, 15))->create([
                    'receipe_id' => $rec->id,
                ]);
                Comment::factory(random_int(10, 15))->create([
                    'receipe_id' => $rec->id,
                ]);
            });
        });
    }
}
