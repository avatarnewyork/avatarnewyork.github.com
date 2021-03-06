$(function() {
	$('#search-query').lunrSearch({
		indexUrl: '/search.json',             // URL of the `search.json` index data for your site
		results:  '#search-results',          // jQuery selector for the search results container
		entries:  '.entries',                 // jQuery selector for the element to contain the results list, must be a child of the results element above.
		template: '#search-results-template', // jQuery selector for the Mustache.js template
	    onDisplay: function(){
	        var input = $('#search-query').val();
	    	$( "#search-results .search-results-title" ).text( 'Search results for "'+ input +'"'); 
	    }  
	});
});



$(document).ready(function(){
	if ($('.previous .disabled') && $('.next .disabled')) {
		$('#bottom-span').hide();
	}

    $(".waypoints-container").waypoint({
        handler: function (direction){
       		if (direction === "down"){
            	$(this).delay(250).animate({opacity: 1}, 200);
          	}
        },
        offset: '100%'
    });
});



