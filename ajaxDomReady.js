(function ($) {
  // DOM & AJAX FIRED READY
	$(document).on('ready ajax.ready', function(e)
	{
		(function($f) {// $ IS SCREWED TO e.target IN HERE!
			//console.log($(':root'), $.ajax);
		})( function(s) { return $(s, e.target); });
	});
})(jQuery);
