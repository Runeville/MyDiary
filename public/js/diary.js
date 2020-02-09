$(document).ready(function(){
    let posts;
    let currentPost;
    let diary = parseInt(document.getElementById('diary-id').innerHTML);
    let lastPost;
    let method;
    let createPostPage = document.getElementById('create-post');
    let showPostPage = document.getElementById('diary-show');
    $.get('/p/show/' + diary, function (data) {
        posts = data;
        currentPost = posts[0];
        lastPost = posts[posts.length - 1];
    });

    //POST CREATING
    document.getElementById("post-create-btn").addEventListener("click", createPost);
    function createPost(){
        method = 'create';

        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();
        today = dd + '.' + mm + '.' + yyyy;

        document.getElementById("post-create-title").innerHTML = "Note " + (lastPost['counter'] + 1) + ' - ' + today + '.';
        document.getElementById("post-create-area").innerHTML = 'New content';

        showPostPage.style.display = 'none';
        createPostPage.style.display = 'block';
    }

    //POST UPDATING
    document.getElementById("post-update-btn").addEventListener("click", updatePost);
    let getPostNumber;
    function updatePost(){
        method = 'update';

        document.getElementById('post-create-title').innerHTML = currentPost['title'];
        document.getElementById('post-create-area').innerHTML = currentPost['content'];
        showPostPage.style.display = 'none';
        createPostPage.style.display = 'block';
    }
    //SAVING POSTS
    $('#post-save').click(function () {
        let content = document.getElementById("post-create-area").innerHTML;
        let title = document.getElementById("post-create-title").innerHTML;
        if(method === 'create') {
            savePost(content, title, diary);
        } else if (method === 'update'){
            savePost(content, title, diary, currentPost['counter']);
        }
    });

    function savePost(content, title, diary, postToUpdate = null) {
        if (content !== '') {
            if(postToUpdate === null) {
                posts.push({diary_id: diary, counter: (lastPost['counter'] + 1), title: title, content: content});
                lastPost = posts[posts.length - 1];
                showPost(lastPost['counter']);
                $.post('/p/create/' + diary, {title: title, content: content});
                createPostPage.style.display = 'none';
                showPostPage.style.display = 'block';
                document.getElementById("post-create-area").innerHTML = null;
                document.getElementById("post-create-title").innerHTML = null;

                checkArrow();
            } else {
                currentPost.title = title;
                currentPost.content = content;
                for (let i = 0; i < posts.length; i++){
                    if(posts[i]['counter'] === currentPost['counter']){
                        posts[i] = currentPost;
                        break;
                    }
                }
                showPost(currentPost['counter']);
                $.ajax({ url: '/p/update/' + diary + '/' + postToUpdate, method: 'PUT', data:{title: title, content:content, counter:postToUpdate}});
                document.getElementById("post-create-area").innerHTML = null;
                createPostPage.style.display = 'none';
                showPostPage.style.display = 'block';
            }
        }
    }
    //DELETE POST
    $('#post-delete-btn').click(function () {
        if (posts.length !== 1){
            $.ajax({
                url: '/p/delete/' + diary + '/' + currentPost['counter'],
                method: "DELETE",
                data: {counter: currentPost['counter']}
            });

            posts.splice(currentPost['counter'] - 1, 1);
            for (let i = currentPost['counter'] - 1; i < posts.length; i++) {
                posts[i]['counter'] -= 1;
            }

            if (currentPost['counter'] <= posts.length) {
                for (let i = 0; i < posts.length; i++) {
                    if (posts[i]['counter'] === currentPost['counter']) {
                        currentPost = posts[i];
                        break;
                    }
                }
            } else {
                for (let i = 0; i < posts.length; i++) {
                    if (posts[i]['counter'] === currentPost['counter'] - 1) {
                        currentPost = posts[i];
                        break;
                    }
                }
            }
            lastPost = posts[posts.length - 1];
            showPost(currentPost['counter']);
        }
    });
    //===========================================================================================
    //SWITCHING POSTS+++++++++++++++++++++
    //Search
    $('#search').keyup(function(){
        document.getElementById('search-inner').innerHTML = null;
        let title = $('#search').val().toLowerCase();
        if(title !== '') {
            for (let i = 0; i < posts.length; i++) {
                if (posts[i]['title'].toLowerCase().indexOf(title) !== -1) {
                    document.getElementById('search-inner').innerHTML += '<div class="search-item" title=' + posts[i]["counter"] + '>' + posts[i]['title'] + '</div>';
                }
            }
            let searchItems = document.querySelectorAll(".search-item");
            for (let i = 0; i < searchItems.length; i++) {
                searchItems[i].onclick = function(){
                    document.getElementById('search-inner').innerHTML = null;
                    document.getElementById('search').value = null;
                    showPost(parseInt(searchItems[i].getAttribute('title')));
                };
            }
        }
    });


    function showPost(post = 1){
        if(post > lastPost || post < 1) {
            post = 1;
        }

        for (let i = 0; i < posts.length; i++){
            if(posts[i]['counter'] === post){
                currentPost = posts[i];
                break;
            }
        }
        $("#post-title-show").html(currentPost.title);
        $("#post-content-show").html(currentPost.content);
        $("#current-post").html(currentPost.counter);
        $("#last-post").html(lastPost.counter);
        checkArrow(currentPost['counter']);

    }

    function checkArrow(){
        if(currentPost['counter'] === lastPost['counter']){
            $('#right-arrow').addClass('not_active');
        } else {
            $('#right-arrow').removeClass('not_active');
        }
        if(currentPost['counter'] === 1){
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
            pEditContent = $('#c-post-input').val();
            if(pEditContent) {
                document.getElementById('c-post-input').value = null;
                showPost(parseInt(pEditContent));
            }
        }
    });
    //Show
    $('#clickToEdit').dblclick(function () {
        document.getElementById('c-post-input').value = document.getElementById('current-post').innerText;
        pEdit.show();
        $('#c-post-input').select();
    });

    //RIGHT ARROW
    $('#right-arrow').click(function () {
        if(currentPost['counter'] !== lastPost['counter']) {
            showPost(currentPost['counter'] + 1);
        }
    });

    //LEFT ARROW
    $('#left-arrow').click(function () {
        if(currentPost['counter'] !== 1) {
            showPost(currentPost['counter'] - 1);
        }
    })
});
