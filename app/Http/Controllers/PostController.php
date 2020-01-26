<?php

namespace App\Http\Controllers;

use App\Diary;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PostController extends Controller
{
    public function store(Diary $diary){
        $data = request()->validate([
            'title' => 'required',
            'content' => 'required',
        ]);

        $data['counter'] = $diary->posts()->count() + 1;

        $diary->posts()->create([
            'title' => $data['title'],
            'content' => $data['content'],
            'counter' => $data['counter'],
        ]);
    }

    public function show(Diary $diary, $post){
        $posts = $diary->posts()->get();
        $post = $diary->posts()->where('counter', $post)->get()[0];
        $post_last = $diary->posts()->latest('id')->first()->counter;
        $post_new = $post_last + 1;

        return array(
            'posts' => $posts,
            'post' => $post,
            'post_last' => $post_last,
            'post_new' => $post_new,
        );
    }
}
