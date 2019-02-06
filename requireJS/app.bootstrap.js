'use strict';

(function(baseUrl, appRoot) {
    window.module = {exports: {}};
    
    window._environment = window._environment instanceof Object ? window._environment : {};
    window._environment.appContext = window._environment.hasOwnProperty('appContext') ? window._environment.appContext : 'Production';

    requirejs.config({
        appDir: appRoot,
        baseUrl: baseUrl,
        urlArgs: _environment.appContext && _environment.appContext === 'Development' ? 'bust=' + (new Date()).getTime() : '',
        paths: {
            app: 'app',
            environment: 'modules/environment',
            jQuery: '3rd-party/jquery.min',
            jQueryUi: '3rd-party/jquery-ui-1.10.2.min',
            jQueryMask: '3rd-party/jquery.mask.min',
            openIban: '3rd-party/openiban.browser'
        },
        shim: {
            'environment': {'deps': ['jQuery']},
            'jQuery': {exports: 'jQuery'},
            'jQueryUi': {'deps': ['jQuery']},
            'jQueryMask': {'deps': ['jQuery']}
        },
        deps: ["app"],
        out: "app.compiled.js"
    });
})('/typo3conf/ext/my-siteload-ext/Resources/Public/Js/', '/');
