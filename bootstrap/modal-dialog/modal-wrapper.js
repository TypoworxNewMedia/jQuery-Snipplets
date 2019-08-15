
/**
 * Triggers a Modal using AJAX-Request
 * @param Event         optional
 * @param Array|Object  options
 */
$.fn.ajaxModal = function() {
    var event, opt = {}, $trigger,
        modalNS = 'modal-generic',
        $modalBox = $('#' + modalNS).clone(),
        modalId = $('[id^='+modalNS+']').length,
        modal= {
            header: '',
            body: '',
            footer: ''
        }
    ;

    if($($modalBox).prop('tagName') === 'TEMPLATE') {
        $modalBox = $($modalBox.html());
    }

    $($modalBox).attr('id', $($modalBox).attr('id') +'-'+ modalId);

    // parse arguments, either event and/or options
    for(var argn in arguments) {
        var arg = arguments[argn];
        if (arg instanceof Object && arg.hasOwnProperty('originalEvent')) {
            event = arg;
        }
        else if (arg instanceof Object || arg instanceof Array) {
            opt = arg;
        }
    }

    $trigger = $(this);
    event && event.preventDefault();

    opt.cssClass && $('.modal-dialog', $modalBox).addClass(opt.cssClass);
    modal.header = $($trigger).data('modal-headline') || opt && opt['headline'] || '';
    modal.footer = opt['footer'] || '';

    if(opt['content']['uri'])
    {
        $.ajax({
            url: opt['content']['uri'],
            dataType: 'html',
            beforeSend: function() {
                PageLoader.createLoader();
            },
            complete: function(xhr) {
                let contentType = xhr.getResponseHeader('Content-Type');

                // AJAX always forces 3xx redirects internally!
                // So implement 307-redirect using JSON-Response {location: '{URL}'}
                if(xhr.state() === 'rejected') {
                    if(xhr.status >= 300 && xhr.status < 400) {
                        if(contentType === 'application/json') {
                            let response = $.parseJSON(xhr.responseText);

                            if(response && response.hasOwnProperty('location')) {
                                document.location.href = response.location;
                                return;
                            }
                        }
                    }
                }

                PageLoader.destroyLoader();
            }
        })
        .done(function(content, textStatus, xhr) {
            modal.content = content;

            $($modalBox)
                .on('shown.bs.modal', function () {
                    $(this).trigger('focus');
                })
                .on('hidden.bs.modal', function () {
                    $(this).remove();
                })
                .find('.modal-body')
                    .html(modal.content)
            ;

            if (modal['header'] && modal['header'].length > 0) {
                $($modalBox).find('.modal-title').html(modal['header']);
            } else {
                $($modalBox).find('.modal-title').hide();
            }

            if (modal['footer'] && modal['footer'].length > 0) {
                $($modalBox).find('.modal-footer').html(modal['footer'])
            } else {
                $($modalBox).find('.modal-footer').hide();
            }

            $($modalBox).appendTo('body').modal('show');
        });
    }
};

/// enable to use stand-alone ...
$('.modal-ajax,[data-trigger="modal-ajax"]').on('click', $.proxy($.fn.ajaxModal));
$('.modal-ajax,[data-trigger="modal-special-type"]').on('click', function(e) {
    $.proxy(
        $.fn.ajaxModal, this,
        e,
        {
            cssClass: 'modal-xl',
            content: {
                uri: '{ajax-url}&param1' +  + $(this).attr('param1')
            }
        }
    )();
});
