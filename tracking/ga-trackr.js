(function($) {
    $.fn.extend({
        /**
         * JSON Helper parsing data-attributes that are not 100% JSON compatible due to char-escaping
         * @param attrName
         * @returns {{}}
         */
        parseJsonFromAttribute: function(attrName) {
            var jsonString = $(this).data(attrName), jsonOptions = {};

            if(jsonString && jsonString.length > 0) {
                jsonString = jsonString.replace(/'|\{\w|\:\w/g, '"');
            }

            if(jsonString && jsonString.length > 0 && jsonString.substr(0,1) == '{' && jsonString.substr(-1) == '}') {
                try {
                    jsonOptions = ($.parseJSON || $.parse || JSON.parse)(jsonString);
                } catch(ex) {
                    console.log('Cannot parse JSON-String due to some invalid Chars', jsonString);
                    // json is not parseable due to some invalid JSON chars!
                }
            }

            return jsonOptions;
        }
    });

    ///console.log($('<a href="#" data-action="ga-track" data-tracking="{\'eventLabel\': \'foo\'}" />').parseJsonFromAttribute('tracking'));

    $(document).ready(function() {
        $('a.download').each(function (e) {
            var data = $(this).parseJsonFromAttribute('tracking'),
                defaultEvent = {}
            ;

            if(!data.hasOwnProperty('eventAction')) {
                defaultEvent.eventAction = 'download';
                
                //var matcDownload = new RegExp('/\.(doc|docx|xls|ppt|odt|ods|pdf|zip|tar|gz|txt|vsd|vxd|rar|exe|wma|mov|avi|ogg|ogm|mkv|wmv|mp3|webm)/')
                //if(matcDownload.test($(this).attr('href'))) {
                    //defaultEvent.eventAction = 'download';
                //}
            }

            $(this).attr({
                'data-action': 'ga-event',
                'data-tracking': JSON.stringify(defaultEvent).replace('"', '\'')
            });
        });

        $('[data-action="ga-event"]').on('click', function(e) {
            e.preventDefault();
            var data = $(this).parseJsonFromAttribute('tracking');

            if(!(data instanceof Object)) {
                return;
            }

            if(!data.hasOwnProperty('eventAction')) {
                data.eventAction = 'click';
            }

            if(!data.hasOwnProperty('eventLabel')) {
                data.eventLabel = $(this).attr('href');
            }

            // onClick="ga('send', 'event', { eventCategory: 'download', eventAction: 'click', eventLabel: 'FooBar.pdf'});"
            console.log("ga('send', 'event', data);", data);
        });
    });
})(jQuery);
