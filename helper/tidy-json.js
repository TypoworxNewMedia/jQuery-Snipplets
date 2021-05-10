(function ($) {
    $.tidyJson = function(string) {
        if(string === undefined) return string;
        return string.toString().replace(/([ ,\:\{\}]+)/g, function(m) {
            return $.trim(m);
        }).replace(/(\w+)/g, function(m) {
            return '"'+m+'"';
        });
    };
}) (jQuery);
