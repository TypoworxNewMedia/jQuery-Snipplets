(function ($) {
  $('.module--flexslider').not('.module--flexslider-initialized').each(function () {
          var container = $(this),
              options = $(this).data('flexslider') || {}
          ;

          options = $.extend({
              itemMargin: 0,
              animation: 'slide',
              animationLoop: true,
              slideshow: true,
              smoothHeight: true,
              itemWidth: 'variable',
              touch: false,
              mousewheel: false,
              controlNav: true,
              prevText: '',
              nextText: ''
          }, options);

          // Delegate callbacks to events
          options = $.extend(options, {
              init: function() { $(container).addClass('module--flexslider-initialized').trigger('init.flexslider'); },
              start: function() { $(container).resize().trigger('start.flexslider'); },
              before: function() { $(container).trigger('before.flexslider'); },
              after: function() { $(container).resize().trigger('after.flexslider'); }
          });

          // events/touch-and-gestures/touch-handler.js
          if($.fn.touchHandler) {
              $(this)
                  .touchHandler()
                  .on('left.move.touch right.move.touch', function (e) {
                      if (e.type === 'left') {
                          $(this).flexslider('prev');
                      }
                      else {
                          $(this).flexslider('next');
                      }
                  })
              ;
          }

          $(this).flexslider(options);
      });
  }) (jQuery);
