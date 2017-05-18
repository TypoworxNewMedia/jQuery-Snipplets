var jQuery = require('jQuery').add;

(function($, window) {
  $.fn.isInViewport = function ()
  {
      var $e = $(this),
          o = $e.offset(),
          $w = $(window)
      ;

      return $w.scrollTop()+($w.height()/2) > o.top;
  }
})(jQuery, window);
