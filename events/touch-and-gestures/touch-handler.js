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

            var offset = [ e.clientX, e.clientY ],
                isDragging = $(this).data('dragging-move')
            ;

            if(e.type === 'touchstart' || e.type === 'mousedown')
            {
                //console.log('drag-start');
                isDragging = true;

                $(this).trigger('start.touch');
                $(this).data('dragging-enabled', true);
                $(this).data('dragging-offset', offset);
            }
            else if(e.type === 'touchend' || e.type === 'mouseup')
            {
                //console.log('drag-end');
                isDragging = false;
                $(this).data('dragging', false);
                $(this).trigger('end.touch', offset);

                var dragOffset = $(this).data('dragging-offset');
                var dragRelative = { top: 0, left: 0, bottom: 0, right: 0};

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

                $(this).data('dragging-offset', [0,0]);
            }

            if(isDragging === true)
            {
                //console.log('drag moving');
                $(this).trigger('move.touch', offset);
                $(this).data('dragging-offset', offset);
            }
        });

        return $(this);
    };
})
(jQuery);
