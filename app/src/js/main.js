// JavaScript for SideNav Push

/* Set the width of the side navigation to 250px and the left margin of the 
   page content to 250px and add a black background color to body */

function openNav() {
    document.getElementById("mySideNav").style.left = "0px";
    document.getElementById("main").style.marginLeft = "250px";
    document.getElementById("main").style.marginRight = "-250px";
    // document.body.style.backgroundColor = "rgba(129,129,129,0.4)";
}

function closeNav() {
    // style left modified as width wrapped sub menu - not visually pleasing
    document.getElementById("mySideNav").style.left = "-250px";
    document.getElementById("main").style.marginLeft= "0";
    document.getElementById("main").style.marginRight= "0";
}