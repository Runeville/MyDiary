<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Auth::routes();

Route::get('/', 'MainController@index');

Route::get('/create', 'DiaryController@create');
Route::get('/show/{diary}', 'DiaryController@index');
Route::get('/show/{diary}/{post}', 'PostController@show');

Route::post('/create', 'DiaryController@store');

Route::post('/p/create/{diary}', 'PostController@store');
