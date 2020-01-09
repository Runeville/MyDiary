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
        getSidebar.style.width = "33vh";
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
        getSidebar.style.width = "80px";
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
