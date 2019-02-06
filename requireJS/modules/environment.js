define(['jQuery'], function($) {
    /**
     * App Context
     */
    window._environment = window._environment instanceof Object ? window._environment : {};
    window._environment.appContext = window._environment.hasOwnProperty('appContext') ? window._environment.appContext : 'Production';
    window._environment.debug = (_environment.appContext === 'Development' || document.location.hostname.toString().match(/\.local|local\./) !== null);

    (function (w, d, c) {
        // Register Console-Shim
        w.console = (function () {
            var consoleFallback = {
                log: function () {
                }, info: function () {
                }, warning: function () {
                }, error: function () {
                }, clear: function () {
                }
            };
            return $ && $.extend
                ? $.extend(consoleFallback, c || {})
                : c || consoleFallback
                ;
        })();

        if (window._environment.debug === true) {
            // Clear Console on reload
            w.addEventListener('beforeunload', function () {
                c.clear()
            });

            (c.info || c.log)("==============================\nActivating Development-Mode!\n==============================");
            (c.info || c.log)('[*] JS Exceptions active!');
        }

        w.throw = function (exp) {
            (c.error || c.log)(exp)
        };
        w.tryModule = function (f, contextName) {
            try {
                return f();
            } catch (exp) {
                if (window._environment.debug) {
                    if (contextName != undefined) (c.error || c.log)('Exception in component \'' + contextName + '\'', exp);
                    else (c.error || c.log)(exp);
                }
            }
        };
    })(window, document, console);
});
