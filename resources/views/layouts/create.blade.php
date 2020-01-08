
<div class="create-diary row">
    <div class="col-md-4 offset-4 text-center">
        <form action="/create" method="post">
            @csrf
            <label for="title"></label>
            <textarea maxlength="100" class="create-title mb-3 text-center" placeholder="Title" name="title" id="title" cols="30" rows="4" required></textarea>
            <button class="btn btn-reg">Create</button>
        </form>
    </div>
</div>
