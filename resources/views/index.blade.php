@extends('layouts.app')

@section('content')

    <div class="container container-create">
        @include('layouts.create')
    </div>

    <aside class="sidebar">
        <div class="text-center w-100 mt-3">
            <a href="#">Create new diary</a>
        </div>
        <hr>
        <ul class="offset-1">
            <li><a href="#">1. First</a></li>
            <li><a href="#">2. Second</a></li>
            <li><a href="#">3. Third</a></li>
        </ul>
    </aside>


@endsection
