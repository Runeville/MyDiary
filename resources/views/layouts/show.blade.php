<div class="diary-handbook row">
    <div id="diary-title" class="col-4 offset-4 text-center">
        <p class="create-title mb-4 text-center"><span id="diary-id" style="display: none">{{$diary->id}}</span>{{ $diary->title }}</p>
        <button id="btn-show-diary" class="btn btn-reg">Open the diary</button>
    </div>

{{--  POST VIEWING  --}}
    @if($method == 'show')
    <div id="diary-show" class="diary-main">
        <div class="page-top row align-items-center">
            <div class="search-container offset-3">
                <input type="text" id="search" placeholder="Search by title" autocomplete="off">
                <div id="search-inner"></div>
            </div>
        </div>

        <div id="post-title-show" class="post-title">
            {{ $current_post->title }}
        </div>
        <div id="post-content-show" class="post-content">
            {{ $current_post->content }}
        </div>

        <div class="page-bottom row align-items-center">
            <div id="arrows-container" class="offset-5 mr-4">
                <span id="left-arrow" class="not_active"><</span> <span id="clickToEdit"><span id="current-post">{{ $current_post->counter }}</span>/<span id="last-post">{{$post_last}}</span></span> <span id="right-arrow">></span>
                <div id="pEdit">
                    <input id="c-post-input" type="number">
                </div>
            </div>
            <button id="post-create-btn" class="btn diary-bold">Create new +</button>
            <button id="post-update-btn" class="btn mr-2 diary-bold">Update post</button>
            <button id="post-delete-btn" class="btn mr-2 diary-bold">Delete post</button>
        </div>
    </div>
    @endif

{{--POST CREATING--}}
    <div id="create-post" class="diary-main">
        <div class="page-top row align-items-center">
            <span id="back" class="ml-4 diary-bold"><=</span>
        </div>
        <div id="post-create-title" class="post-title" contenteditable="true"></div>
        <div id="post-create-area" class="post-content" contenteditable="true"></div>
        <div class="page-bottom row align-items-center">
            <button id="post-save" class="btn offset-2 diary-bold">Save post</button>
        </div>
    </div>
</div>
