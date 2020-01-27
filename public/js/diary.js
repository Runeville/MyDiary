$(document).ready(function(){
    //POST CREATING
    document.getElementById("post-create-btn").addEventListener("click", createPost);
    function createPost(){
        let createPostPage = document.getElementById('create-post');
        let showPostPage = document.getElementById('diary-show');
        document.getElementById("post-create-area").innerHTML = null;

        showPostPage.style.display = 'none';
        createPostPage.style.display = 'block';

        $('#post-save').click(function () {
            let content = document.getElementById("post-create-area").innerHTML;
            let diary = parseInt(document.getElementById('diary-id').innerHTML);

            savePost(content, diary);
        });
    }

    //POST UPDATING
    document.getElementById("post-update-btn").addEventListener("click", updatePost);
    let getPostNumber;
    function updatePost(){
        let getPostContent = document.getElementById('post-content-show').innerHTML;
        getPostNumber = document.getElementById('current-post').innerHTML;
        let createPostPage = document.getElementById('create-post');
        let showPostPage = document.getElementById('diary-show');

        document.getElementById('post-create-area').innerHTML = getPostContent;
        showPostPage.style.display = 'none';
        createPostPage.style.display = 'block';

        $('#post-save').click(function () {
            let content = document.getElementById("post-create-area").innerHTML;
            let diary = parseInt(document.getElementById('diary-id').innerHTML);

            savePost(content, diary, getPostNumber);
            getPostNumber = null;
        });
    }
    //SAVING POSTS
    function savePost(content, diary, postToUpdate = null) {
        if (content !== '') {
            if(postToUpdate === null) {
                $.post('/p/create/' + diary, {title: 'title', content: content}, function (data) {
                    $("#current-post").html(data.counter);
                    $("#post-content-show").html(data.content);
                });
                document.getElementById('create-post').style.display = 'none';
                document.getElementById('diary-show').style.display = 'block';
                document.getElementById("post-create-area").innerHTML = null;

                let lastPost = parseInt(document.getElementById('last-post').innerHTML) + 1;

                $("#last-post").html(lastPost);
                $('#right-arrow').addClass('not_active');
                $('#left-arrow').removeClass('not_active');
            } else {
                $.ajax({ url: '/p/update/' + diary + '/' + postToUpdate, method: 'PUT', data:{title: 'title', content:content, counter:postToUpdate}})
                    .then(function(data) {
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
    //SWITCHING BY INPUT
    function showPost(post = 1){
        let diary = parseInt(document.getElementById('diary-id').innerHTML);
        let lastPost = parseInt(document.getElementById('last-post').innerHTML);
        if(post > lastPost || post < 1) {
            post = 1;
        }
        $.get("/show/" + diary + "/" + post, function (data) {
            $("#current-post").html(data.post.counter);
            $("#post-content-show").html(data.post.content);
        });
        checkArrow(post);

    }

    function checkArrow(currentPost){
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
