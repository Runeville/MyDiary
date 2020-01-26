$(document).ready(function(){
    //POST CREATING
    document.getElementById("post-create-btn").addEventListener("click", createPost);
    function createPost(){
        let createPostPage = document.getElementById('create-post');
        let showPostPage = document.getElementById('diary-show');

        showPostPage.style.display = 'none';
        createPostPage.style.display = 'block';
    }

    $('#post-save').click(function () {
        let content = document.getElementById("post-create-area").innerHTML;
        let diary = parseInt(document.getElementById('diary-id').innerHTML);
        $.post('/p/create/' + diary, {title:'title', content:content}, function (data) {
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
    });
    //POST CREATING END=======

    //RIGHT ARROW
    $('#right-arrow').click(function () {
        let diary = parseInt(document.getElementById('diary-id').innerHTML);
        let lastPost = parseInt(document.getElementById('last-post').innerHTML);
        let currentPost = parseInt(document.getElementById('current-post').innerHTML);
        if(currentPost < lastPost) {
            $.get("/show/" + diary + "/" + (currentPost + 1), function (data) {
                $("#current-post").html(data.post.counter);
                $("#post-content-show").html(data.post.content);
            })
        }
        if(currentPost === lastPost - 1){
            $('#right-arrow').addClass('not_active');
        }
        $('#left-arrow').removeClass('not_active');
    });

    //LEFT ARROW
    $('#left-arrow').click(function () {
        let diary = parseInt(document.getElementById('diary-id').innerHTML);
        let currentPost = parseInt(document.getElementById('current-post').innerHTML);
        if(currentPost > 1) {
            $.get("/show/" + diary +"/" + (currentPost - 1), function (data) {
                $("#current-post").html(data.post.counter);
                $("#post-content-show").html(data.post.content);
            })
        }
        if(currentPost <= 2){
            $('#left-arrow').addClass('not_active');
        }
        $('#right-arrow').removeClass('not_active');
    })
});