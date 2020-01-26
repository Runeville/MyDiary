<div class="diary-handbook row">
    <div id="diary-title" class="col-4 offset-4 text-center">
        <p class="create-title mb-4 text-center"><span id="diary-id" style="display: none">{{$diary->id}}</span>{{ $diary->title }}</p>
        <button id="btn-show-diary" class="btn btn-reg">Open the diary</button>
    </div>

{{--  POST VIEWING  --}}
    @if($method == 'show')
    <div id="diary-show" class="diary-main">
        <div class="post-content">
            {{ $current_post->content }}
        </div>
        <div id="page-view">
            <span id="left-arrow" class="not_active"><</span> <span id="current-post">{{ $current_post->counter }}</span>/<span id="last-post">{{$post_last}}</span> <span id="right-arrow">></span>
        </div>
    </div>
    @endif

{{--POST CREATING--}}
    <form id="post-create" action="p/create/{{ $diary }}">
        @csrf
        <div id="create-post" class="diary-main">
            <div class="post-content" contenteditable="true">

            </div>
        </div>
    </form>

</div>
