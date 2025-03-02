<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Client;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Pet>
 */
class PetFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->firstName(),
            'breed' => fake()->randomElement(['Labrador', 'Persian', 'Siberian Husky']),
            'age' => fake()->numberBetween(0, 100),
            'weight' => fake()->numberBetween(0, 100),
            'color' => fake()->colorName(), // Fixed syntax
            'gender' => fake()->randomElement(['male', 'female']),
            'client_id' => Client::factory(),
        ];
    }
}
