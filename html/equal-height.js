
var tryModule = require('tryModule').add;
var jQuery = require('jQuery').add;
var modernizr = require('modernizr').add;

/**
* Modernizr
*/
$(function () {
    // FlexBox Equal-Height Shim
    tryModule(function() {
        if (!Modernizr.flexbox) {
            $('.row-flex')
                .on('load ready content.ready', function (e) {
                    var maxH = $.map($(this).children(), function (el) {
                        return $(el).innerHeight();
                    });
                    if (maxH) {
                        maxH.sort(), maxH = maxH.length ? maxH.pop() : null;

                        if (maxH > 0) {
                            $(this).children().height(maxH).css('min-height', maxH);
                        }
                    }
                })
                .trigger('content.ready')
                .find('img').on('load', function () {
                $(this).parents('.row-flex').trigger('content.ready');
            });
        }
    }, 'modernizr.flexbox-shiv');
});
