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

Route::post('/create', 'DiaryController@store');

Route::get('/p/show/{diary}', 'PostController@show');
Route::post('/p/create/{diary}', 'PostController@store');
Route::post('/search', 'PostController@search');
Route::put('/p/update/{diary}/{post}', 'PostController@update');
Route::delete('/p/delete/{diary}/{post}', 'PostController@delete');
