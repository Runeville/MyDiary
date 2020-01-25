<?php

namespace App\Http\Controllers;

use App\Diary;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function store(Diary $diary){
        $data = request()->validate([
            'title' => 'required',
            'content' => 'required',
        ]);

        $diary->posts()->create([
            'title' => $data['title'],
            'content' => $data['content'],
        ]);
    }
}
