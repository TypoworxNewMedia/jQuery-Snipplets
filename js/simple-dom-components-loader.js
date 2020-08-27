/**
 AJAX Dom-Ready Trigger for Modules & Components
 Solution #1
*/

(function() {
  $(document).on('ready ajax.ready', function(e) {
    // e.target -> domDoc is either window.document or ajax scope (if given in AJAX request)
    (function(domDoc) {
      $('div[data-module]', domDoc).each(function() {
        ///console.log('Pre-Init data-module', $(this).data('module'), $(this).prop('id'));

        if($(this).data('module') === 'google-map')
        {
          if ($(this).children().length === 0 && !$(this).data('module-init'))
          {
            $(this).data('module-init', true);
            google.maps.event.addDomListener(window, 'load', StdwMaps.init($(this).prop('id')));
          }
        }
      });
    })(e.target);
  });
})(jQuery);


/**
 AJAX Dom-Ready Trigger for Modules & Components
 Solution #2
*/
window._debug = false;
//window.throw = function(exp) { (console.error || console.log)(exp) };
window.tryModule = function(f,n) {
  try {
    return f();
  } catch (exp) {
    if (_debug) {
      throw (exp);
    } else if(exp) {
      if(n != undefined) (console.error || console.log)('Exception in component \''+n+'\'', exp);
      else (console.error || console.log)(exp);
    }
  }
};

$(document).ajaxComplete(function(e, xhr, settings) {
  $(document).trigger('ajax.ready');
});

$(document).on('ready ajax.ready', function(e) {
  // e.target -> domDoc is either window.document or ajax scope (if given in AJAX request)
  (function(domDoc) {
    $('div[data-module]', domDoc).each(function() {
      ///console.log('Pre-Init data-module', $(this).data('module'), $(this).prop('id'));

      if($(this).data('module-init')) { return; }

      tryModule(
        $.proxy(
          function() {
            switch ($(this).data('module')) {
              case 'google-map':
                if ($(this).children().length > 0) { break; }

                $(this).data('module-init', true);
                google.maps.event.addDomListener(window, 'load', new google.maps.Map($(this).prop('id'), { center: { lat: null, lng: null }, zoom: 8 }));
                break;

              case 'slick-slider':
                if ($(this).is('.slick-initialized')) { break; }
                $(this).data('module-init', true);

                var options = {
                  prevArrow: '<button type="button" class="slick-prev"><svg class="svg-icon" viewBox="0 0 45 102"><use xlink:href="#slider_arrow_prev" /></svg></button>',
                  nextArrow: '<button type="button" class="slick-next"><svg class="svg-icon" viewBox="0 0 45 102"><use xlink:href="#slider_arrow_next" /></svg></button>',
                  dots: true,
                  autoplay: false,
                  arrows: true
                };

                $('.slider').not('.slick-initialized').slick(options);
                break;
            }
          },
          this
        ),
        'module.component.' + $(this).data('module') + ($(this).prop('id') ? '.' + $(this).prop('id') : '')
      );
    });
  })(e.target);
});
