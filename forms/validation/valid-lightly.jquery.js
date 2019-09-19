/**
 * A Form Validator following the keep-it-simple-and-small principle
 *
 * @author Gabriel Kaufmann
 * @param opt   options object
 * @param cb    optional callback-function
 */
(function($) {
  $.fn.validLightly = function(opt, cb) {
      let _self = this.validLightly = $.extend({
          selector: 'input,select',
          errorCssClass: 'has-error',
          errorCallback: cb instanceof Function || null
      }, opt || {});

      $(this).find(this.validLightly.selector)
          .filter('[pattern],[required]').not('[hidden]')
          .on('submit invalid', $.proxy(function(e) {
              console.log(e.type);
              if(e.type === 'invalid') {
                  e.preventDefault();
              }

              $(this).removeClass(this.validLightly.errorCssClass);

              let hasError = false,
                  val = $.trim($(this).val()),
                  pattern = $(this).prop('pattern'),
                  isRequired = $(this).prop('required')
              ;

              hasError = hasError || isRequired && !val;

              if (!!pattern) {
                  if(pattern.substr(0,1) !== pattern.substr(-1,1)) {
                      pattern = '~' + pattern + '~';
                  }

                  try {
                      hasError = hasError || !val.match(pattern);
                  } catch (e) {
                      console.log('Invalid form-validation regex-pattern!');
                  }
              }

              hasError && (this).addClass(this.validLightly.errorCssClass);

              // trigger callback if given
              cb && cb(this, hasError);
          }, this))
      ;
  };
})(jQuery);
