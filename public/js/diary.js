$(document).ready(function(){
    let method;
    //POST CREATING
    document.getElementById("post-create-btn").addEventListener("click", createPost);
    function createPost(){
        method = 'create';

        let createPostPage = document.getElementById('create-post');
        let showPostPage = document.getElementById('diary-show');
        let lastPost = parseInt(document.getElementById('last-post').innerText);

        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();
        today = dd + '.' + mm + '.' + yyyy;

        document.getElementById("post-create-title").innerHTML = "Note " + (lastPost + 1) + ' - ' + today + '.';
        document.getElementById("post-create-area").innerHTML = 'New content';

        showPostPage.style.display = 'none';
        createPostPage.style.display = 'block';
    }

    //POST UPDATING
    document.getElementById("post-update-btn").addEventListener("click", updatePost);
    let getPostNumber;
    function updatePost(){
        method = 'update';
        let getPostContent = document.getElementById('post-content-show').innerHTML;
        let getPostTitle = document.getElementById('post-title-show').innerHTML;
        let createPostPage = document.getElementById('create-post');
        let showPostPage = document.getElementById('diary-show');

        document.getElementById('post-create-title').innerHTML = getPostTitle;
        document.getElementById('post-create-area').innerHTML = getPostContent;
        showPostPage.style.display = 'none';
        createPostPage.style.display = 'block';
    }
    //SAVING POSTS
    $('#post-save').click(function () {
        let content = document.getElementById("post-create-area").innerHTML;
        let title = document.getElementById("post-create-title").innerHTML;
        let diary = parseInt(document.getElementById('diary-id').innerHTML);
        if(method === 'create') {
            savePost(content, title, diary);
        } else if (method === 'update'){
            getPostNumber = document.getElementById('current-post').innerHTML;
            savePost(content, title, diary, getPostNumber);
        }
    });

    function savePost(content, title, diary, postToUpdate = null) {
        if (content !== '') {
            if(postToUpdate === null) {
                $.post('/p/create/' + diary, {title: title, content: content}, function (data) {
                    $("#post-title-show").html(data.title);
                    $("#post-content-show").html(data.content);
                    $("#current-post").html(data.counter);
                });
                document.getElementById('create-post').style.display = 'none';
                document.getElementById('diary-show').style.display = 'block';
                document.getElementById("post-create-area").innerHTML = null;
                document.getElementById("post-create-title").innerHTML = null;

                let lastPost = parseInt(document.getElementById('last-post').innerHTML) + 1;

                $("#last-post").html(lastPost);
                checkArrow();
            } else {
                $.ajax({ url: '/p/update/' + diary + '/' + postToUpdate, method: 'PUT', data:{title: title, content:content, counter:postToUpdate}})
                    .then(function(data) {
                        $("#post-title-show").html(data.title);
                        $("#post-content-show").html(data.content);
                    });
                document.getElementById("post-create-area").innerHTML = null;
                document.getElementById('create-post').style.display = 'none';
                document.getElementById('diary-show').style.display = 'block';
            }
        }
    }
    //DELETE POST
    $('#post-delete-btn').click(function () {
        let post = document.getElementById('current-post').innerHTML;
        let diary = parseInt(document.getElementById('diary-id').innerHTML);
        $.ajax({url:'/p/delete/' + diary + '/' + post, method:"DELETE", data:{counter:post}})
            .then(function (data) {
                let lastPost = parseInt(document.getElementById('last-post').innerText) - 1;
                $("#last-post").html(lastPost);
                $("#post-content-show").html(data.content);
                $("#current-post").html(data.counter);
                if(data.counter === lastPost){
                    $('#right-arrow').addClass('not_active');
                }
            })
    });
    //===========================================================================================
    //SWITCHING POSTS+++++++++++++++++++++
    $('#search').keyup(function(){
        let title = $('#search').val();
        $.post('/search', {
            title:title
        }, function (data) {
            console.log(data);
            document.getElementById('search-inner').innerHTML = null;
            if(data.title !== null) {
                for (let post in data) {
                    document.getElementById('search-inner').innerHTML += '<a href="#" class="search-item" style="text-decoration: none">' + data[post]['title'] + '</a>';
                }
            }
        });
    });

    function showPost(post = 1){
        let diary = parseInt(document.getElementById('diary-id').innerHTML);
        let lastPost = parseInt(document.getElementById('last-post').innerHTML);
        if(post > lastPost || post < 1) {
            post = 1;
        }
        $.get("/show/" + diary + "/" + post, function (data) {
            $("#post-title-show").html(data.title);
            $("#post-content-show").html(data.content);
            $("#current-post").html(data.counter);
        });
        checkArrow(post);

    }

    function checkArrow(currentPost = document.getElementById('last-post').innerHTML){
        let lastPost = parseInt(document.getElementById('last-post').innerHTML);
        currentPost = parseInt(currentPost);
        if(currentPost === lastPost){
            $('#right-arrow').addClass('not_active');
        } else {
            $('#right-arrow').removeClass('not_active');
        }
        if(currentPost === 1){
            $('#left-arrow').addClass('not_active');
        } else {
            $('#left-arrow').removeClass('not_active');
        }
    }

    let pEdit = $("#pEdit");
    let pEditContent;
    //Hide
    $(document).click(function (e) {
        if (!pEdit.is(e.target)
            && pEdit.has(e.target).length === 0)
        {
            pEdit.hide();
            pEditContent = $('#pEdit input').val();
            if(pEditContent) {
                document.getElementById('current-post').innerText = pEditContent;
                document.getElementById('c-post-input').value = null;

                showPost(pEditContent);

            }
        }
    });
    //Show
    $('#clickToEdit').dblclick(function () {
        document.getElementById('c-post-input').value = document.getElementById('current-post').innerText;
        pEdit.show();
    });

    //RIGHT ARROW
    $('#right-arrow').click(function () {
        let currentPost = parseInt(document.getElementById('current-post').innerHTML);
        if(currentPost !== parseInt(document.getElementById('last-post').innerText)) {
            showPost(currentPost + 1);
        }
    });

    //LEFT ARROW
    $('#left-arrow').click(function () {
        let currentPost = parseInt(document.getElementById('current-post').innerHTML);
        if(currentPost !== 1) {
            showPost(currentPost - 1);
        }
    })
});
