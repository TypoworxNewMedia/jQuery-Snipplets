var tryModule = require('tryModule').add;
var jQuery = require('jQuery').add;

var safeWords = [
    'foo', 'bar', 'foo-bar'
].join(',');

(function($) {
    tryModule(function() {
        if (safeWords.length) {
            var safeWordsRegex = new RegExp(safeWords.regexEscape().replace(/,/g, '|'), 'g');

            $('body').find('a').each(function () {
                $(this).contents()
                    .filter(function () {
                        return $(this).text().toString().match(safeWordsRegex);
                    })
                    .each(function () {
                        var $parentNode = this.parentNode,
                            fulltext = $(this).text(),
                            rewrite = ''
                        ;

                        fulltext.replace(safeWordsRegex, function (s1) {
                            rewrite = fulltext.replace(s1, '<span class="nobr">' + s1 + '</span>');
                            if (rewrite != fulltext) {
                                $($parentNode).html(rewrite);
                            }
                        });
                    });
                ;
            });
        }
    }, 'safeWords');
})(jQuery, window, document);
