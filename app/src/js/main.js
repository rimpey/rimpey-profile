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

$(document).ready(function() {


    // *** NAVIGATION ***//

    // Menu click animate slide to top of slide
    $('#mySideNav a, #top-nav a').on('click', function(e){
        e.preventDefault();

        var slide = $(this.hash); // e.g. $('#slide1')
		if (slide.length) {	// a slide exists with this id
			var offsetTop = slide.offset().top; // get position of top of slide
           	// animate to top of slide over 1000 milliseconds
  			$('html, body').animate({scrollTop: offsetTop}, 1000);
        }
    });
    

    // *** CONTACT ME FORM ***//

    // Align bottom of message input to bottom of Email input
    // Get the y-coordinate of the bottom of the phone input
    var emailInput = $('#input-email');
    var bottomOfEmail = emailInput.position().top + emailInput.height();
    // Set the textarea height to bottom of phone input - top of textarea
    var messageInput = $('#input-message');
    messageInput.height(bottomOfEmail - messageInput.position().top);


    
    // *** PROJECT - READ MORE TOGGLE and CLICK ON CROSS CLOSE ***//

    $(".toggle-read, .cross-close").on('click', function(e){

        e.preventDefault();
        var workDiv = $('#' + $(this).attr('data-work-id')); 
        var visible = workDiv.is(':visible');

        // set all text to View More
        $(".toggle-read").html("VIEW MORE /");
        // close all project detail divs that are open
        $(".work-details").removeClass("display-flex"); 
        // grey text for all projects until selected
        $(".work-project").removeClass("active-text"); 
        // get rid of any project logo line hightlights
        $(".work-logo").removeClass('highlight-line');
        // set all inactive logos viewable to top
        $(".logo-active").hide();
        $(".logo-inactive").show();

        var logoDiv = $('#' + $(this).attr('data-logo-id'));
        var workSummary = $('#' + $(this).attr('data-summary-id'));

        // add .active to just clicked 'View More' (not cross clicked) 
        if ($(this).hasClass("toggle-read") && !visible) {

            logoDiv.addClass('highlight-line'); 
            //logoImgActive.addClass('active-to-top');
            logoDiv.find('.logo-active').show();
            logoDiv.find('.logo-inactive').hide();
            workSummary.addClass('active-text');
            workDiv.addClass('display-flex'); 
            $(this).html("CLOSE /");
        }
    });
});
