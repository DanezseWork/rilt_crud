<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Client>
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
            'name' => fake()->name(),
            'breed' => fake()->jobTitle(),
            'age' => fake()->numberBetween(0, 100),
            'weight' => fake()->numberBetween(0, 100),
            `color` => fake()->colorName(),
            'gender' => fake()->randomElement(['male', 'female']),
            'client_id' => fake()->numberBetween(1, 10),
        ];
    }
} 
