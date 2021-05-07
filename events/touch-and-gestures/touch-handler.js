(function ($) {
    $.fn.touchHandler = function() {
        $(this).on('touchstart touchend mousedown mouseup touchmove mousemove', function(e) {
            e.preventDefault();

            var offset = [ e.clientX, e.clientY ],
                isDragging = $(this).data('dragging-move');
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
                $(this).trigger('end.touch');

                var dragOffset = $(this).data('dragging-offset');
                var dragRelative = { top: 0, left: 0, bottom: 0, right: 0};

                if(offset[0] > dragOffset[0])
                {
                    //console.log('drag move right');
                    $(e.target).trigger('right.drag');
                }
                else if(offset[0] < dragOffset[0])
                {
                    //console.log('drag move left');
                    $(e.target).trigger('left.drag');
                }

                if(offset[1] > dragOffset[1])
                {
                    //console.log('drag move down');
                    $(e.target).trigger('down.drag');
                }
                else if(offset[1] < dragOffset[1])
                {
                    //console.log('drag move up');
                    $(e.target).trigger('up.drag');
                }

                dragRelative.top = offset[1] - dragOffset[1];
                dragRelative.left = offset[0] - dragOffset[0];
                $(e.target).trigger('offset.drag', dragRelative);

                $(this).data('dragging-offset', [0,0]);
            }

            if(isDragging === true)
            {
                //console.log('drag moving');
                $(this).trigger('move.touch');
                $(this).data('dragging-offset', offset);
            }

            $(this).data('dragging-move', isDragging);
        });
    };
})
(jQuery);
