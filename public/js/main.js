"use strict";

let sidebar = false;
document.getElementById("sidebar-burger").addEventListener("click", displaySidebar);
function displaySidebar(){
    let getSidebar = document.getElementById('sidebar');
    let getSidebarUl = document.querySelector('#sidebar ul');
    let getSidebarLink = document.querySelector('#sidebar div a');
    let getSidebarHr = document.querySelector('#sidebar hr');
    let getBurger = document.getElementById('sidebar-burger');

    if(sidebar === false){
        getSidebar.classList.remove('sidebar-short');
        getSidebar.classList.add('sidebar-full');
        getBurger.style.width = '40px';
        getBurger.style.transform = 'rotate(-90deg)';
        getSidebarUl.style.display = 'block';
        getSidebarUl.style.opacity = '1';
        getSidebarLink.style.display = 'block';
        getSidebarLink.style.opacity = '1';
        getSidebarHr.style.display = 'block';
        getSidebarHr.style.opacity = '.35';
        sidebar = true;
    } else {
        getSidebar.classList.remove('sidebar-full');
        getSidebar.classList.add('sidebar-short');
        getBurger.style.transform = 'rotate(0deg)';
        getSidebarUl.style.opacity = '0';
        getSidebarUl.style.display = 'none';
        getSidebarLink.style.opacity = '0';
        getSidebarLink.style.display = 'none';
        getSidebarHr.style.opacity = '0';
        getSidebarHr.style.display = 'none';
        sidebar = false;
    }

}

document.getElementById("btn-show-diary").addEventListener("click", showDiary);
function showDiary(){
    let getDiaryMain = document.getElementById('diary-show');
    let getDiaryTitle = document.getElementById('diary-title');

    getDiaryMain.style.display = 'block';
    getDiaryTitle.style.display = 'none';
}

$('#back').click(function () {
    let createPostPage = document.getElementById('create-post');
    let showPostPage = document.getElementById('diary-show');

    showPostPage.style.display = 'block';
    createPostPage.style.display = 'none';
});
