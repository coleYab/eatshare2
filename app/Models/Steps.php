<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Steps extends Model
{
    /** @use HasFactory<\Database\Factories\StepsFactory> */
    use HasFactory;

    public $fillable = [
        'title',
        'time',
        'description',
        'receipe_id'
    ];

    public function recepie() {
        return $this->belongsTo(Receipe::class);
    }
}
