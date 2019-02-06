Fluid-Template:
    
{namespace v=FluidTYPO3\Vhs\ViewHelpers}

<v:asset.script name="appcontext" group="kuno">
    var _environment={'appContext': '<f:format.raw>{v:context.get()}</f:format.raw>'}
    var _kunoApp={'token': '<f:format.raw>{session.token}</f:format.raw>'};
</v:asset.script>

<v:page.footer>
    <script data-main="{f:uri.resource(extensionName: 'my-sideload-ext', path: 'Js/app.bootstrap.js')}" src="{f:uri.resource(extensionName: 'my-sideload-ext', path: 'Js/require.js')}"></script>
</v:page.footer>
