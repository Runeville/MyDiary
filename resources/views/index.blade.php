@extends('layouts.app')

@section('content')

    <div class="container container-diary">
        @if($method === 'create')
            @include('layouts.create')
        @elseif($method === 'show')
            @include('layouts.show')
        @endif
    </div>

    @include('layouts.sidebar')

@endsection
