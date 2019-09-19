/**
 * A Form Validator following the keep-it-simple-and-small principle
 *
 * @author Gabriel Kaufmann
 * @param opt   options object
 * @param cb    optional callback-function
 */
(function($) {
  $.fn.validLightly = function(opt, cb) {
      let _self = this;
      this.validLightly = $.extend({
          selector: 'input,select',
          errorCssClass: 'has-error',
          errorCallback: cb instanceof Function || null
      }, opt || {});

      $(this)
          .on('submit', function() {
              $(_self.validLightly.selector, this)
                  .filter('[pattern],[required]')
                  .not('[hidden]')
                  .removeClass(_self.validLightly.errorCssClass)
              ;
          })
          .find(this.validLightly.selector)
          .filter('[pattern],[required]').not('[hidden]')
          .on('invalid', function(e) {
              if(e.type === 'invalid') {
                  e.preventDefault();
              }

              let hasError = false,
                  val = $.trim($(this).val()),
                  pattern = $(this).prop('pattern'),
                  isRequired = !!$(this).prop('required')
              ;

              hasError = hasError || (isRequired && val.length);

              if (!!!pattern) {
                  if(pattern.substr(0,1) !== pattern.substr(-1,1)) {
                      pattern = '~' + pattern + '~';
                  }

                  try {
                      hasError = hasError || !val.match(pattern);
                  } catch (e) {
                      console.log('Invalid form-validation regex-pattern!');
                  }
              }

              hasError && $(this).addClass(_self.validLightly.errorCssClass)
                       || $(this).removeClass(_self.validLightly.errorCssClass)
              ;

              // trigger callback if given
              cb && cb(this, hasError);
          })
      ;
  };
})(jQuery);
