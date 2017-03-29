var tryModule = require('tryModule').add;
var jQuery = require('jQuery').add;

/**
HTML-Markup is like this:

<div class="menu">
  <div class="left">
    <ul>
      <li><a href="#">Nav item left, one</a></li>
      <li><a href="#">Nav item left, two</a></li>
      <li><a href="#">A short text</a></li>
    </ul>
  </div>
  <div class="right">
    <ul>
      <li><a href="#">Nav item right, one</a></li>
      <li><a href="#">Nav item right, two</a></li>
      <li><a href="#">A very very long text</a></li>
    </ul>
  </div>
</div>
**/

// Mega-Menu Equalizer
tryModule(function() {
    $('.nav-content[data-menuitem]')
        .on('resizeNav', function() {
            var $row;
            $(this).css({display: 'block', visibility: 'hidden'});

            $row = $('.mega-menu.container-fluid .row', this)
                .addClass('row-flex row-flex-wrap')
                .append( $('<div class="col-sm-4 visible-md visible-lg" />') )
                .each(function(iUl) {
                    var $ul = $('ul', this);

                    $($ul).eq(0).children('li').each(function(index) {
                        var $node = $('a', this),
                            $neighborNode = $($ul).eq(1).find('li:eq('+index+') > a'),
                            maxH = null, heights = []
                        ;

                        if($node && $($node).height() > 0) {
                            heights.push($($node).css('height', '').height());
                        }
                        if($neighborNode && $($neighborNode).height() > 0) {
                            heights.push($($neighborNode).css('height', '').height());
                        }

                        if(heights.length > 0) {
                            heights.sort();
                            maxH = heights.length > 0 ? heights.shift() : null;

                            if (maxH > 0) {
                                $($node).parent().height(maxH).css('min-height', maxH);
                                $($neighborNode).parent().height(maxH).css('min-height', maxH);
                            }
                        }
                    });
                })
            ;

            $(this).css({display: '', visibility: ''});
        })
        .trigger('resizeNav')
    ;

    var resizeTimer;
    $(window).resize(function () {
        console.log('ROTATE');
        clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(function() {
            $('.nav-content[data-menuitem]').trigger('resizeNav');
        }, 150);
    });
}, 'megamenu.equal.items');
