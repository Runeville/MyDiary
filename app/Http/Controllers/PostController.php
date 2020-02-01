<?php

namespace App\Http\Controllers;

use App\Diary;
use App\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PostController extends Controller
{
    protected static function getDiary($diary){
        $diary = auth()->user()->diaries()->where([['user_id', auth()->user()->id], ['counter', $diary]])->get();

        return $diary;
    }

    public function store($diary){
        $diary = self::getDiary($diary);
        if (count($diary) != 0){
            $diary = $diary[0];
        } else{
            return redirect('/');
        }

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

    public function show($diary){
        $diary = self::getDiary($diary);
        if (count($diary) !== 0){
            $diary = $diary[0];
        } else{
            return redirect('/');
        }
        $posts = $diary->posts()->get();

        return $posts;
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

    public function update($diary, $post){
        $diary = self::getDiary($diary);
        if (count($diary) !== 0){
            $diary = $diary[0];
        } else{
            return redirect('/');
        }
        $post = $diary->posts()->where('counter', $post)->get()[0];

        $data = request()->validate([
            'title' => 'required',
            'content' => 'required',
            'counter' => 'required'
        ]);
        $post->update($data);

        return $data;
    }

    public function delete($diary, $post){
        $diary = self::getDiary($diary);
        if (count($diary) !== 0){
            $diary = $diary[0];
        } else{
            return redirect('/');
        }
        $post = $diary->posts()->where('counter', $post)->get()[0];
        if($diary->posts()->count() != 1){
            $post->delete();
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
