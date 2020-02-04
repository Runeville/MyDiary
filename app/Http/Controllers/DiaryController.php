<?php

namespace App\Http\Controllers;

use App\Diary;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DiaryController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    protected static function getDiary($diary){
        $diary = auth()->user()->diaries()->where([['user_id', auth()->user()->id], ['counter', $diary]])->get();

        return $diary;
    }

    public function index($diary){
        $user = auth()->user();
        $diary = self::getDiary($diary);
        if (count($diary) !== 0){
            $diary = $diary[0];
        } else{
            return redirect('/');
        }

        $method = 'show';

        $posts = $diary->posts()->get();
        $post_last = $diary->posts()->latest('id')->first()->counter;
        $post_new = $post_last + 1;
        $current_post = $diary->posts()->where('counter', 1)->get()[0];

        return view('index', compact('user', 'method', 'diary', 'posts', 'post_new', 'post_last', 'current_post'));
    }

    public function create(){
        $user = auth()->user();
        $method = 'create';

        return view('index', compact('user', 'method'));
    }

    public function store(){
        $data = request()->validate([
            'title' => 'required|max:100|min:1',
        ]);
        $data['counter'] = auth()->user()->diaries()->count() + 1;

        auth()->user()->diaries()->create([
            'title' => $data['title'],
            'counter' => $data['counter']
        ]);

//        Redirecting on the just created diary
        return redirect("/show/" . $data['counter']);
    }
}
