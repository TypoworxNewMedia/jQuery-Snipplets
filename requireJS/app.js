define(['jQuery', 'environment'], function() {
    (function(doc, $) {
        $(document).ready(function() {
            tryModule(function () {
                // Application JS

            }, 'application.foo-bar.app');
        });
    })(document, jQuery);
});
