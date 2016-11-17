(function($) {
    $.fn.photoSwipe = function(o) {
        var options = $.extend({
            index: 0,
            loop: true,

            shareEl: true,
            shareButtons: [
                {id:'download', label:'Download image', url:'{{raw_image_url}}', download:true}
            ],
        }, o || {});

        $(this).each(function(i) {
            var items=[], i=[],$src,$media;
            $('.ce-media', this).each(function(i) {
                $src = $('a:first', this);
                $media = $('img:first', this);
                items.push({
                    src: $src.prop('href'),
                    w: $($media).data('fullwidth'),
                    h: $($media).data('fullheight')
                });

                $($media).data('galleryOffset', i);
            });

            $(this)
                .data('galleryId', i+1)
                .data('galleryItems', items)
            ;

            $('a > img', this).on('click', {gallery: this}, function(e) {
                var gid, current = this, items, gallery, pswO = {};
                e.preventDefault();

                pswO = $.extend(options, {
                    index: $(current).data('galleryOffset') || 0,
                    getThumbBoundsFn: function() {
                        o = $(current).offset();
                        return o ? { x: o.left, y: o.top, w: $(current).width() } : {};
                    }
                });
                if(e.data && e.data.hasOwnProperty('gallery'))
                {
                    var $g = $(e.data.gallery), gid;
                    if((gid = $($g).parents('div[id]').prop('id')))
                    {
                        pswO.galleryUID = gid;
                    }

                    items = $($g).data('galleryItems');
                    gallery = new PhotoSwipe($('#pswp').get(0), PhotoSwipeUI_Default, items, pswO);
                    gallery.init();
                }
            });
        });
    };

    $(document).ready(function() {
        $('.ce-gallery').photoSwipe();
    });
})(jQuery);
