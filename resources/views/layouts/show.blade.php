<div class="diary-handbook row">
    <div id="diary-title" class="col-4 offset-4 text-center">
        <p class="create-title mb-4 text-center"><span id="diary-id" style="display: none">{{$diary->id}}</span>{{ $diary->title }}</p>
        <button id="btn-show-diary" class="btn btn-reg">Open the diary</button>
    </div>

{{--  POST VIEWING  --}}
    @if($method == 'show')
    <div id="diary-show" class="diary-main">
        <div id="post-content-show" class="post-content">
            {{ $current_post->content }}
        </div>
        <div class="page-bottom row align-items-center">
            <div id="arrows-container" class="offset-5 mr-5">
                <span id="left-arrow" class="not_active"><</span> <span id="current-post">{{ $current_post->counter }}</span>/<span id="last-post">{{$post_last}}</span> <span id="right-arrow">></span>
            </div>
            <button id="post-update-btn" class="btn mr-2">Update post</button>
            <button id="post-create-btn" class="btn">Create new +</button>
        </div>
    </div>
    @endif

{{--POST CREATING--}}
    <div id="create-post" class="diary-main">
        <div id="post-create-area" class="post-content" contenteditable="true"></div>
        <div class="page-bottom row align-items-center">
            <button id="post-save" class="btn offset-2">Save post</button>
        </div>
    </div>
</div>
