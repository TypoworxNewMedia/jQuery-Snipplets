/**
* @auhor: Gabriel Kaufmann <info@typoworx.de>
* @description:
* Debounce events that should not be triggered
* multiple-times in a given time, f.e. if fired-up
* by multiple selectors.
*/

/**
@example
HTML:
<a class="click-me" data-action="click-me">Test me</a>
JavaScript:
$('a.click-me, a[data-action="click-me"]').on('click touch', function(e) {
    e.preventDefault();
    // This may get fired-up 2-times ...
    
    // Debounce Event by delay of 1500 ms
    $(this).debounce(e, 1500, function() {
        console.log('Fire-Up debounced Event-Code ...');
    });
});
**/

$.fn.debounce = function(e, ms, fn) {
    if(!ms) ms = 5000;

    var d = $(e.target).data('debouncer') || {};

    if(d[ e.type ] > 0)
    {
        if((d[ e.type ]+ms) > e.timeStamp)
        {
            // Debounce and drop event
            e.stopPropagation();
            return false;
        }
    }

    d[ e.type ] = e.timeStamp;
    $(e.target).data('debouncer', d);
    $.proxy(fn, e.target, e)();
};
