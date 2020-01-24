<div class="create-diary row">
    <div class="col-4 offset-4 text-center">
        <form action="/create" method="post">
            @csrf
            <p class="create-title mb-3 text-center">{{ $diary->title }}</p>
        </form>
    </div>
</div>
