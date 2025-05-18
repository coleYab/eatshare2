<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreReceipeRequest;
use App\Http\Requests\UpdateReceipeRequest;
use App\Models\Receipe;
use Illuminate\Http\Request;
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
        ->paginate();
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
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreReceipeRequest $request)
    {
        $request = $request->validated();
        $receipe = Receipe::create($request->all());
        return $receipe;
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
        return $receipe;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateReceipeRequest $request, Receipe $receipe)
    {
        return $request;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Receipe $receipe)
    {
        $receipe->delete();
        return response()->json(200);
    }
}
