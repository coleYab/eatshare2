<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateReceipeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'preparation_time' => ['required','integer'],
            'cooking_time' => ['required','integer'],
            'servings' => ['required', 'integer'],
            'difficulty' => ['required', 'string'],
            'ingredients' => ['required', 'array'],
            'ingredients.*.name' => ['required', 'string', 'max:255'],
            'ingredients.*.amount' => ['required', 'integer', 'max:255'],
            'ingredients.*.unit' => ['required', 'string', 'max:255'],
            'steps' => ['array'],
            'steps.*.description' => ['required', 'string'],
            'steps.*.time' => ['required', 'integer'],
            'image' => ['required', 'string']
        ];
    }
}
