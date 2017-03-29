/**
 * String RegExp-Escape
 */
String.prototype.regexEscape = function() {
    return this.replace(/([\\\/\$\.\*\(\)\[\]\|])/g,'\\$1');
};
