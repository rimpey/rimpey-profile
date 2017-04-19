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
    $('#mySideNav a, #top-nav a').on('click', function(e){
        e.preventDefault();

        var slide = $(this.hash); // e.g. $('#slide1')
		if (slide.length) {	// a slide exists with this id
			var offsetTop = slide.offset().top; // get position of top of slide
           	// animate to top of slide over 1000 milliseconds
  			$('html, body').animate({scrollTop: offsetTop}, 1000);
        }
    });
    

    // *** SIDE NAVIGATION ***//

    // Set the width of the side navigation to 250px and the left margin of the 
    // page content to 250px can add a black background color to body 

    


    // *** CONTACT ME FORM ***//

    // Align bottom of message input to bottom of Email input
    // Get the y-coordinate of the bottom of the phone input
    var emailInput = $('#input-email');
    var bottomOfEmail = emailInput.position().top + emailInput.height();
    // Set the textarea height to bottom of phone input - top of textarea
    var messageInput = $('#input-message');
    messageInput.height(bottomOfEmail - messageInput.position().top);


    
    // *** PROJECT - READ MORE TOGGLE and CLICK ON CROSS CLOSE ***//

    //var allWorkDetails = $('.work-details');

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
        //$(".logo-active").removeClass('active-to-top');
        $(".logo-active").hide();
        $(".logo-inactive").show();


        var logoDiv = $('#' + $(this).attr('data-logo-id'));
        var workSummary = $('#' + $(this).attr('data-summary-id'));
        //var workDiv = $('#' + $(this).attr('data-work-id')); 

        // var logoImgActive = logoDiv.find('.logo-active');
        // var logoImgActive = logoDiv.children('.logo-active');
        // var logoImgActive = $('.logo-active', logoDiv);
        // var logoImgActive = logoDiv.find('img').first();



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


    // *** PROJECT - READ MORE TOGGLE and CLICK ON CROSS CLOSE ***//

    // $(".toggle-read, .cross-close").on('click', function(e){

    //     e.preventDefault();

        // make all toggle-read's the same to eliminate previously opened label
        // $(".toggle-read").html("VIEW MORE /");
        // remove all $(".prog-details")
        
        // Display the work details for the work project clicked as a flex
        // var toggleDiv = $(this).data('workId'); // references 'data-work-id' in main.js
        // var workDiv = $('#' + $(this).attr('data-work-id')); // same as above references 'data-work-id' in main.js
        // alternative to traversing DOM
        // $(this).parent().parent().prev().find('.work-logo').css('border-bottom', '2px solid green');
        // example of referencing another data attribute
        // var logoDiv = $('#' + $(this).attr('data-logo-id'));
        // display the divide row with border and cross to close
        // var divideDiv = $('#' + $(this).attr('data-divide-id'));
        
        // if (workDiv.is(':visible')) {
            // close it
            // logoDiv.removeClass('highlight-line');
            // workDiv.removeClass('display-flex');  //.hide(); if not using removeClass()
            // divideDiv.removeClass('proj-divide');
            // $(".toggle-read").html("VIEW MORE /"); // all toggle-read classes
            // $(this).html("VIEW MORE /"); // toggle-read class clicked
        // } else {
            // open it
            // Cross Close will never run through this code so safe to change text of $(this) object as can only be from toggle-read
            // logoDiv.addClass('highlight-line'); 
            // workDiv.addClass('display-flex'); // if use .show(); replaces display:flex with display: block
            // workDiv.show().css('display', 'flex'); // add/remove class for flex none
            // divideDiv.addClass('proj-divide');

            // default for the close cross is left aligned change to right when first project whfnp
            // if (divideDiv.attr("id") == "whfnp-divide") {
            //     $(".cross-close").addClass('cross-right');
            // }
            // swap label for current clicked
    //         $(this).html("CLOSE /");
    //     }
    // });
});
