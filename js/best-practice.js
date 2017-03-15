var _debug = document.location.hostname.toString().indexOf('.local') > -1;

(function() {
    window.console = console ||  { log: function() {} };
    if(_debug) {
        (console.info || console.log)("==============================\nActivating Development-Mode!\n==============================");
        (console.info || console.log)('[*] JS Exceptions active!');
    }

    window.throw = function(exp) { (console.error || console.log)(exp) };
    window.tryModule = function(f) {
        try {
            return f();
        } catch (exp) {
            if (_debug) (console.error || console.log)(exp);
        }
    };
})();

tryModule(function() {
    throw 'DOW';
});
console.log('Happy we can look forward despite any exception!');


(function($) {
   // Your jQuery Stuff comes here
})(jQuery);
