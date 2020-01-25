<div class="diary-handbook row">
    <div id="diary-title" class="col-4 offset-4 text-center">
        <p class="create-title mb-4 text-center">{{ $diary->title }}</p>
        <button id="btn-show-diary" class="btn btn-reg">Open the diary</button>
    </div>

{{--  POST VIEWING  --}}
    <div id="diary-show" class="diary-main">
        <div class="post-content">

        </div>
        <div id="page-view">
            <span><</span> 1/{{$post_last}} <span>></span>
        </div>
    </div>

{{--POST CREATING--}}
    <form id="post-create" action="p/create/{{ $diary }}">
        @csrf
        <div id="diary-main" class="diary-main">
            <div class="post-content" contenteditable="true">

            </div>
        </div>
    </form>

</div>
