<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Receipe;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create(): Response
    {
        return Inertia::render('auth/register');
    }

    public function like(Receipe $receipe): Response
    {
        $curUser = request()->user();
        $curUser->like($receipe);
        $curUser->loadMissing('liked');
        return Inertia::render('demo/show', ['data'=> $curUser]);
    }

    public function follow(User $user): Response
    {
        $curUser = request()->user();
        $curUser->follow($user);
        return Inertia::render('demo/show', ['data'=> $user]);
    }


    public function followers(User $user): Response
    {
        $user->loadMissing('followers');
        $user->loadMissing('following');
        return Inertia::render('demo/show', ['data'=> $user]);
    }


    public function following(User $user): Response
    {
        $user->loadMissing('followers');
        $user->loadMissing('following');
        return Inertia::render('demo/show', ['data'=> $user]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($user));

        Auth::login($user);

        return to_route('dashboard');
    }
}
