<?php

use App\Http\Controllers\Auth\RegisteredUserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ReceipeController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\ProfileController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('profile', [ProfileController::class, 'show']);
    Route::get('profile/{id}', [ProfileController::class, 'show']);
    Route::get('discover/chef', [ProfileController::class, 'index']);

    Route::get('search', [ ReceipeController::class, 'search' ]);
    Route::resource('receipe/{receipe}/comment', CommentController::class);
    Route::get('receipe/{receipe}/like', [ RegisteredUserController::class, "like" ]);
    Route::get('user/{user}/follow', [ RegisteredUserController::class, "follow" ]);
    Route::get('user/{user}/followers', [ RegisteredUserController::class, "followers" ]);
    Route::get('user/{user}/following', [ RegisteredUserController::class, "following" ]);
    Route::resource('receipe', ReceipeController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
