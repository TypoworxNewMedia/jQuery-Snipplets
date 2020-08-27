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
