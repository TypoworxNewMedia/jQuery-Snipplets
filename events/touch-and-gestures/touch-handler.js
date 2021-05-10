/**
 * Example:
 * $(this)
 *  .touchHandler()
 *  .on('left.move.touch right.move.touch', function(e) {
 *      if(e.type === 'left')
 *      {
 *          $(this).flexslider('prev');
 *      }
 *      else
 *      {
 *          $(this).flexslider('next');
 *      }
 *   })
 * ;
 **/

(function ($) {
    $.fn.touchHandler = function() {
        $(this).on('touchstart touchend mousedown mouseup touchmove mousemove', function(e) {
            e.preventDefault();

            var offset = [ e.clientX, e.clientY ];

            if(e.type === 'touchstart' || e.type === 'mousedown')
            {
                //console.log('drag-start');
                $(this).trigger('start.touch', offset);
                $(this).data('drag-offset', offset);
                $(this).addClass('drag-start');

                $(this).data('drag-active', true);
            }
            else if(e.type === 'touchend' || e.type === 'mouseup')
            {
                //console.log('drag-end');
                $(this).trigger('end.touch', offset);

                $(this).removeClass('drag-start');
                $(this).data('drag-active', false);

                var dragOffset = $(this).data('drag-offset');
                $(this).data('drag-offset', [0,0]);
                var dragRelative = { top: 0, left: 0, bottom: 0, right: 0};

                console.log(offset[0],dragOffset[0]);
                if(offset[0] > dragOffset[0])
                {
                    //console.log('drag move right');
                    $(e.target).trigger('left.move.touch');
                }
                else if(offset[0] < dragOffset[0])
                {
                    //console.log('drag move left');
                    $(e.target).trigger('right.move.touch');
                }

                if(offset[1] > dragOffset[1])
                {
                    //console.log('drag move down');
                    $(e.target).trigger('down.move.touch');
                }
                else if(offset[1] < dragOffset[1])
                {
                    //console.log('drag move up');
                    $(e.target).trigger('up.move.touch');
                }

                dragRelative.top = offset[1] - dragOffset[1];
                dragRelative.left = offset[0] - dragOffset[0];
                $(e.target).trigger('endmove.touch', dragRelative);
            }


            if($(this).data('drag-active') === true)
            {
                $(this).trigger('move.touch', offset);
            }
        });

        return $(this);
    };
})
(jQuery);
