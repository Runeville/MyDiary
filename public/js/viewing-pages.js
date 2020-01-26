$(document).ready(function(){
    //RIGHT ARROW
    $('#right-arrow').click(function () {
        let diary = parseInt(document.getElementById('diary-id').innerHTML);
        let lastPost = parseInt(document.getElementById('last-post').innerHTML);
        let currentPost = parseInt(document.getElementById('current-post').innerHTML);
        if(currentPost < lastPost) {
            $.get("/show/" + diary +"/" + (currentPost + 1), function (data) {
                $("#current-post").html(data.post.counter);
                $(".post-content").html(data.post.content);
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
                $(".post-content").html(data.post.content);
            })
        }
        if(currentPost <= 2){
            $('#left-arrow').addClass('not_active');
        }
        $('#right-arrow').removeClass('not_active');
    })
});
