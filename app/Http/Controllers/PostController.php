<?php

namespace App\Http\Controllers;

use App\Diary;
use App\Post;
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
        return $data;
    }

    public function show(Diary $diary, $post){
        $post = $diary->posts()->where('counter', $post)->get()[0];

        return $post;
    }

    public function search(Request $request){
        if($request->title !== null){
            $posts = Post::search($request->title)->get();
            $foundPosts = null;
            foreach ($posts as $post) {
                if (strpos(mb_strtolower($post['title']), mb_strtolower($request->title)) !== false){
                    $foundPosts[] = $post;
                }
            }
            return $foundPosts;
        }

        return null;
    }

    public function update(Diary $diary, $post){
        $post = $diary->posts()->where('counter', $post)->get()[0];

        $data = request()->validate([
            'title' => 'required',
            'content' => 'required',
            'counter' => 'required'
        ]);
        $post->update($data);

        return $data;
    }

    public function delete(Diary $diary, $post){
        $posts = $diary->posts()->get();
        $post = $diary->posts()->where('counter', $post)->get()[0];

        if($diary->posts()->count() != 1){
            Post::where('id', $post->id)->delete();
        } else {
            die();
        }

        DB::table('posts')->where([
            ['diary_id', '=', $diary->id],
            ['counter', '>', $post->counter]
        ])->decrement('counter');

        if ($post->counter <= $diary->posts()->count()){
            $post = $diary->posts()->where('counter', $post->counter)->get()[0];
        } else {
            $post_counter = $post->counter - 1;
            $post = $diary->posts()->where('counter', $post_counter)->get()[0];
        }

        return $post;
    }
}
