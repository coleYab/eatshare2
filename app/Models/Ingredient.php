<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ingredient extends Model
{
    /** @use HasFactory<\Database\Factories\IngredientFactory> */
    use HasFactory;

    public $fillable = [
        'name',
        'amount',
        'unit',
        'receipe_id'
    ];

    public function recepie() {
        return $this->belongsTo(Receipe::class);
    }
}
