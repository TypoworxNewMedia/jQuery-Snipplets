(function ($) {
    $.tidyJson = function(string) {
        if(string === undefined) return string;
        return string.toString().replace(/([ ,\:\{\}]+)/g, function(m) {
            return $.trim(m);
        }).replace(/(\w+)/g, function(m) {
            return '"'+m+'"';
        });
    };

    $('.module--slick').not('.module--slick-initialized').each(function () {
        if(!$.fn.slick) {
            console.warn('Module slick-slider not installed');
            return;
        }

        var container = $(this),
            options = {}
        ;

        if($(this).data('slick')) {
            options = $.parseJSON($.tidyJson($(this).data('slick')));
        }

        // https://kenwheeler.github.io/slick/#Settings
        options = $.extend({
            dots: false,
            infinite: false,
            arrows: true,
            swipeToSlide: true,
            centerMode: true,
            speed: 300
        }, options);

        $(this).slick(options);
    });
}) (jQuery);
