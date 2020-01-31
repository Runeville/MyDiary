<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;


class Post extends Model
{

    use Searchable;

    protected $guarded = [];

    public function diary(){
        return $this->belongsTo(Diary::class);
    }
}
