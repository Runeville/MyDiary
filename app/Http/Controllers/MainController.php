<?php

namespace App\Http\Controllers;

use App\Diary;
use Illuminate\Http\Request;

class MainController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index(){
        $user = auth()->user();

        return view('index', compact('user'));
    }
}