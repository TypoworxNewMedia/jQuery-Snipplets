'use strict';
(function($) {
    $(document).ready(function() {
        /**
         * LazyScriptLoader
         *
         * @author Gabriel Kaufmann <info@typoworx.de>
         *
         * @example
         *----------------------------------------------------------------
         * For use with footer-libs not available for body-scripts.
         * Use the lazy-load feature to automatically fire these scripts
         * in place you want it!
         *
         * <script type="lazy@text/javascript">
         *  alert('footer-libs already waiting!');
         * </script>
         *----------------------------------------------------------------
         */
        var lazyLoader = function() {
            (function($) {
                $('script[type^="lazy@"]').each(function() {
                    var $script = $($(this).get(0).outerHTML);
                    $script.attr({
                        'type': $script.attr('type').replace('lazy@',''),
                        'lazy': 'true'
                    });
                    $(this).replaceWith($script);
                });
            }) (jQuery);
        };
        if(document.readyState === 'ready' || document.readyState === 'complete') {
            lazyLoader();
        } else {
            document.addEventListener('DOMContentLoaded', lazyLoader(), false);
        }
    });
}) (jQuery);
