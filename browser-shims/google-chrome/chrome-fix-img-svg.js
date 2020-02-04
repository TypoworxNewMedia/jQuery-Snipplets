// SVG Bugfix for Chrome
$('img[src*=".svg"]').on('load', function() {
	if($(this).css('width') === '0' || $(this).css('width') === '0px') {
		$(this).css({ width: '100%', zoom: 1}).css({width: null, zoom: null});
	}
});
