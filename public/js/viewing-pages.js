$(document).ready(function(){
    //RIGHT ARROW
    $('#right-arrow').click(function () {
        let lastPost = parseInt(document.getElementById('last-post').innerHTML);
        let currentPost = parseInt(document.getElementById('current-post').innerHTML);
        if(currentPost < lastPost) {
            $.get("/show/1/" + (currentPost + 1), function (data) {
                $("#current-post").html(data.post.counter);
                $(".post-content").html(data.post.content);
            })
        }
    });

    //LEFT ARROW
    $('#left-arrow').click(function () {
        let currentPost = parseInt(document.getElementById('current-post').innerHTML);
        if(currentPost > 1) {
            $.get("/show/1/" + (currentPost - 1), function (data) {
                $("#current-post").html(data.post.counter);
                $(".post-content").html(data.post.content);
            })
        }
    })
});
