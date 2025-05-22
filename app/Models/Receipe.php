<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Receipe extends Model
{
    /** @use HasFactory<\Database\Factories\ReceipeFactory> */
    use HasFactory;

    protected $fillable = [
                'title',
                'user_id',
                'description',
                'serving',
                'image',
                'preparation_time',
                'cooking_time',
                'difficulty'
    ];

    public function ingredients() {
        return $this->hasMany(Ingredient::class);
    }

    public function comments() {
        return $this->hasMany(Comment::class);
    }

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function steps() {
        return $this->hasMany(Steps::class);
    }
}
