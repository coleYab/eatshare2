<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCommentRequest;
use App\Http\Requests\UpdateCommentRequest;
use App\Models\Comment;
use App\Models\Receipe;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Receipe $receipe)
    {
        $receipe = $receipe->loadMissing('comments');
        return $receipe->comments;
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
    public function store(Receipe $receipe, StoreCommentRequest $request)
    {
        $request = $request->validated();
        $comment = $receipe->comments()->create($request);
    }

    /**
     * Display the specified resource.
     */
    public function show(Receipe $receipe, Comment $comment)
    {
        return $receipe;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Comment $comment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCommentRequest $request, Comment $comment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comment $comment)
    {
        //
    }
}
