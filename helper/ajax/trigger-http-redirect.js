/**
 * -------------------------------------------------------------------------------------------------
 * AJAX HTTP-Response:
 * Status-Code: 30x
 * Pragma: No-Cache
 * Cache-Control: no-store, no-cache, must-revalidate, max-age=0
 * Content-Type: application/json
 * {location: "{redirect-url}"
 *
 * -------------------------------------------------------------------------------------------------
 * $this->response = new Response();
 * $this->response->setStatus(307, 'Temporary Redirect');
 * $this->response->setHeader('Pragma', 'no-cache');
 * $this->response->setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
 * $this->response->setHeader('Content-Type', 'application/json');
 * $this->response->setContent(json_encode(['location' => $fallbackUri]));
 * $this->response->send();
 * $this->response->shutdown();
 * -------------------------------------------------------------------------------------------------
 */

$.ajax({
    url: '{ajax-url}',
    dataType: 'html',
    beforeSend: function() {
        // ...
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

        // ...
    }
})
.done(function(content, textStatus, xhr) {
  // ...
});
