var tryModule = require('tryModule').add;
var jQuery = require('jQuery').add;

var safeWords = [
    'foo', 'bar', 'foo-bar'
].join(',');

(function($) {
    tryModule(function() {
        if (safeWords.length) {
            var safeWordsRegex = new RegExp(safeWords.regexEscape().replace(/,/g, '|'), 'g');

            $('body').find('h1,h2,h3,h4,h5,h6,p,a').each(function () {
                $(this).contents()
                    .filter(function() {
                        // Text-Nodes only!
                        return this.nodeType === 3;
                    })
                    .each(function () {
                        var $parentNode = this.parentNode,
                            textNode = $(this).text(),
                            rewrite = ''
                        ;

                        textNode.replace(safeWordsRegex, function (s1) {
                            rewrite = textNode.replace(s1, '<span class="nobr">' + s1 + '</span>');
                            if (rewrite != textNode) {
                                $($parentNode).html(rewrite)
                            }
                        });
                    });
                ;
            });
        }
    }, 'safeWords');
})(jQuery, window, document);
