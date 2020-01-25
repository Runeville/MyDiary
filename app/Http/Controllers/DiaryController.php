<?php

namespace App\Http\Controllers;

use App\Diary;
use Illuminate\Http\Request;

class DiaryController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index(Diary $diary){
        $user = auth()->user();
        $method = 'show';

        $posts = $diary->posts()->get();
        $post_last = $diary->posts()->latest('id')->count();
        $post_new = $post_last + 1;

        return view('index', compact('user', 'method', 'diary', 'posts', 'post_new', 'post_last'));
    }

    public function create(){
        $user = auth()->user();
        $method = 'create';

        return view('index', compact('user', 'method'));
    }

    public function store(){
        $data = request()->validate([
            'title' => 'required|max:100|min:2',
        ]);

        auth()->user()->diaries()->create([
            'title' => $data['title']
        ]);

        $array = auth()->user()->diaries()->pluck('id');

//        Calculating the just created diary to redirect on it
        $created_diary = null;
        foreach($array as $k => $v)
        {
            if($v > $created_diary or $created_diary === null)
            {
                $created_diary = $v;
            }
        }

//        Redirecting on the just created diary
        return redirect("/show/" . $created_diary);
    }
}
