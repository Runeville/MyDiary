<aside class="sidebar">
    <div class="text-center w-100 mt-3">
        <a href="#">Create new diary</a>
    </div>
    <hr>
    <ul class="offset-1">
        @foreach($user->diaries as $diary)
            <li><a href="/?dr={{$diary->id}}"><abbr title="<?= nl2br($diary->title) ?>"><?= nl2br($diary->title) ?></abbr></a></li>
        @endforeach
    </ul>
</aside>
