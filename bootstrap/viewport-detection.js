/**
 * Bootstrap ViewPort Detection
 * @author Gabriel Kaufmann
 */
jQuery && (function($) {
    $.viewport = {
        options: {
            breakingPoints: {
                xs: 480, sm: 768, md: 992, lg: 1200
            }
        },
        viewport: 'unrecognised',

        init: function() {
            var _this = this;
            $(window)
                .on('resize viewport.detect', function() {
                    var deviceWidth = $(window).width();
                    if (_this.options.breakingPoints) {
                        for (var vW in _this.options.breakingPoints) {
                            if (deviceWidth >= _this.options.breakingPoints[vW]) {
                                _this.viewport = vW;
                            }
                        }
                    }

                    if(!_this.viewport) {
                        _this.viewport = 'unrecognised'
                    }

                    ///console.log('TRACE', _this.viewport);
                    ///console.log($.viewport.is('>md'));
                })
                .trigger('viewport.detect');
            ;
        },

        is: function(vp) {
            if(!this.viewport) {
                return null;
            }
            else if(vp == this.viewport)
            {
                return true;
            }
            else if(vp.indexOf('>=') > -1)
            {
                vpParam = vp.substring(2);
                if (vpParam && this.options.breakingPoints && this.options.breakingPoints[ this.current() ]) {
                    return this.options.breakingPoints[ this.current() ] >= this.options.breakingPoints[ vpParam ];
                }
            }
            else if(vp.indexOf('<=') > -1)
            {
                vpParam = vp.substring(2);
                if (vpParam && this.options.breakingPoints && this.options.breakingPoints[ this.current() ]) {
                    return this.options.breakingPoints[ this.current() ] <= this.options.breakingPoints[ vpParam ];
                }
            }
            else if(vp.indexOf('>') > -1)
            {
                vpParam = vp.substring(1);
                if (vpParam && this.options.breakingPoints && this.options.breakingPoints[ this.current() ]) {
                    console.log('>', this.options.breakingPoints[ this.current() ], this.options.breakingPoints[ vpParam ]);
                    return this.options.breakingPoints[ this.current() ] > this.options.breakingPoints[ vpParam ];
                }
            }
            else if(vp.indexOf('<') > -1)
            {
                vpParam = vp.substring(1);
                if (vpParam && this.options.breakingPoints && this.options.breakingPoints[ this.current() ]) {
                    return this.options.breakingPoints[ this.current() ] < this.options.breakingPoints[ vpParam ];
                }
            }

            return null;
        },

        current: function() {
            return this.viewport;
        }
    };

    $.viewport.init();
})(jQuery);
