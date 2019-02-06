define(['jQuery'], function($) {
    /**
     * App Context
     */
    var _debug = false;
    if (typeof (_environment) !== 'undefined' && _environment instanceof Object) {
        if (_environment.hasOwnProperty('appContext')) {
            _debug = (_environment.appContext === 'Development');
        }
    } else if (document.location.hostname.toString().indexOf('.local') > -1 || document.location.hostname.toString().indexOf('local.') > -1) {
        _debug = true;
    }

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

        if (_debug) {
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
                if (_debug) {
                    if (contextName != undefined) (c.error || c.log)('Exception in component \'' + contextName + '\'', exp);
                    else (c.error || c.log)(exp);
                }
            }
        };
    })(window, document, console);
});
