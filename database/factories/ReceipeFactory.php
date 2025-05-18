<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Receipe>
 */
class ReceipeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
       return [
            'title' => $this->faker->sentence(3),
            'description' => $this->faker->paragraph(),
            'preparation_time' => $this->faker->numberBetween(5, 60),
            'cooking_time' => $this->faker->numberBetween(10, 120),
            'serving' => $this->faker->numberBetween(1, 10),
            'image' => "https://images.all-free-download.com/images/graphiclarge/food_picture_01_hd_pictures_167558.jpg",
            'difficulty' => $this->faker->randomElement(['easy', 'medium', 'hard']),
        ];
    }
}
