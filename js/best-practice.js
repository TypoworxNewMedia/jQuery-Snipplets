/**
 * App Context
 */
var _debug = false;
if(_environment instanceof Object)
{
    if(_environment.hasOwnProperty('appContext'))
    {
        _debug = (_environment.appContext == 'Development');
    }
}
else if(document.location.hostname.toString().indexOf('.local') > -1)
{
    _debug = true;
}

(function() {
    window.console = (function() {
        var consoleFallback = {
            log: function() {}, info: function() {}, warning: function() {}, error: function() {}, clear: function() {}
        };
        return $ && $.extend
            ? $.extend(consoleFallback, console || {})
            : console || consoleFallback
        ;
    })();
    
    if(_debug) {
        (console.info || console.log)("==============================\nActivating Development-Mode!\n==============================");
        (console.info || console.log)('[*] JS Exceptions active!');
    }

    window.throw = function(exp) { (console.error || console.log)(exp) };
    window.tryModule = function(f,n) {
        try {
            return f();
        } catch (exp) {
            if (_debug) {
                if(n != undefined) (console.error || console.log)('Exception in component \''+n+'\'', exp);
                else (console.error || console.log)(exp);
            }
        }
    };
})();

(function($) {
   // Your jQuery Stuff comes here
    
    tryModule(function() {
        throw 'DOW';
    }, 'test.unit.dow');

    /**
    Console throws this only if in debug-mode!

    (x) Exception in component 'test.unit.dow' DOW
    **/

    console.log('This code runs anyway :D');
})(jQuery);
