<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreReceipeRequest;
use App\Http\Requests\UpdateReceipeRequest;
use App\Models\Receipe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Filters\ReceipeFilters;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class ReceipeController extends Controller
{
    /**
     * Searching the resources.
     */
    public function search(Request $request) {
        $qry = $request->input('query');

        $receipes = Receipe::where('title', 'like', '%' . $qry . '%')
            ->orWhere('description', 'like', '%' . $qry . '%')
            ->paginate(10);
        $data = $receipes->appends($request->query());
        return Inertia::render('receipe/index', [ 'data' => $data ]);
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filters = new ReceipeFilters();
        $qry = $filters->transform($request);

        if (count($qry) == 0) {
            $receipe = Receipe::paginate();
            $data = $receipe->appends($request->query());
            return Inertia::render('receipe/index', [ 'data' => $data ]);
        }

        $receipe = Receipe::where($qry)->paginate();
        $data = $receipe->appends($request->query());
        return Inertia::render('receipe/index', [ 'data' => $data ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('receipe/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreReceipeRequest $request)
    {
        $request = $request->validated();
        $receipe = DB::transaction(function() use ($request) {
            $receipe = Receipe::create([
                'user_id' => request()->user()->id,
                'title' => $request['title'],
                'description'=>$request['description'],
                'preparation_time' => $request['preparation_time'],
                'image' => $request['image'],
                'serving' => $request['servings'],
                'cooking_time' => $request['cooking_time'],
                'difficulty' => $request['difficulty'],
            ]);
            foreach ($request['ingredients'] as $ingred) {
                $receipe->ingredients()->create([
                    'name' => $ingred['name'],
                    'amount' => $ingred['amount'],
                    'unit' => $ingred['unit'],
                    'recepie_id' => $receipe->id,
                ]);
            }
            foreach ($request['steps'] as $step) {
                $receipe->steps()->create([
                    'title' => "this is title",
                    'description' => $step['description'],
                    'time' => $step['time'],
                    'recepie_id' => $receipe->id,
                ]);
            }
        });

        return Inertia::location('/receipe');
    }

    /**
     * Display the specified resource.
     */
    public function show(Receipe $receipe)
    {
        $receipe = $receipe->loadMissing('steps');
        $receipe = $receipe->loadMissing('ingredients');
        $receipe = $receipe->loadMissing('user');
        $receipe = $receipe->loadMissing('comments');
        return Inertia::render('receipe/show', [ 'data' => $receipe]);
    }

    /**
     * Show the form for editing the specified resource.
    */
    public function edit(Receipe $receipe)
    {
        $receipe = $receipe->loadMissing('steps');
        $receipe = $receipe->loadMissing('ingredients');
        $receipe = $receipe->loadMissing('user');
        return Inertia::render('receipe/edit', [ 'recipe' => $receipe, 'edit' => true ]);
    }

    /**
     * Update the specified resource in storage.
    */
    public function update(UpdateReceipeRequest $request, Receipe $receipe)
    {
        $requestData = $request->validated();

        $receipe = DB::transaction(function () use ($requestData, $receipe) {
            // Update the main recipe attributes
            $receipe->update([
                'title' => $requestData['title'],
                'description' => $requestData['description'],
                'preparation_time' => $requestData['preparation_time'],
                'image' => $requestData['image'],
                'serving' => $requestData['servings'],
                'cooking_time' => $requestData['cooking_time'],
                'difficulty' => $requestData['difficulty'],
            ]);

            // Delete existing ingredients and steps
            $receipe->ingredients()->delete();
            $receipe->steps()->delete();

            // Create new ingredients
            foreach ($requestData['ingredients'] as $ingred) {
                $receipe->ingredients()->create([
                    'name' => $ingred['name'],
                    'amount' => $ingred['amount'],
                    'unit' => $ingred['unit'],
                    'recepie_id' => $receipe->id,
                ]);
            }

            // Create new steps
            foreach ($requestData['steps'] as $step) {
                $receipe->steps()->create([
                    'title' => $step['title'] ?? 'Step', // Use provided title or default
                    'description' => $step['description'],
                    'time' => $step['time'],
                    'recepie_id' => $receipe->id,
                ]);
            }

            return $receipe->loadMissing(['ingredients', 'steps', 'user', 'comments']);
        });

        return Inertia::render('receipe/show', ['data' => $receipe]);
    }

    /**
     * Remove the specified resource from storage.
    */
    public function destroy(Receipe $receipe)
    {
        $receipe->delete();
        return Inertia::location('/receipe');
    }
}
