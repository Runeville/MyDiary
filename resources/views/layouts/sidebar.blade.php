<aside id="sidebar" class="sidebar sidebar-short">
    <div class="text-center w-100 mt-3">
        <img id="sidebar-burger" src="{{ asset('img/sidebar-burger.png') }}" alt="">
        <a href="/create">Create new diary</a>
    </div>

    <hr>
    <ul>
        @foreach($user->diaries as $diary)
            <li><a class="sidebar-diary" href="/show/{{$diary->id}}"><abbr title="<?= nl2br($diary->title) ?>"><?= nl2br($diary->title) ?></abbr></a></li>
        @endforeach
    </ul>
</aside>
