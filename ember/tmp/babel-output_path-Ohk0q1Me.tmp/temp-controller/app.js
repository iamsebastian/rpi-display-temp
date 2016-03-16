define('temp-controller/app', ['exports', 'ember', 'temp-controller/resolver', 'ember-load-initializers', 'temp-controller/config/environment'], function (exports, _ember, _tempControllerResolver, _emberLoadInitializers, _tempControllerConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _tempControllerConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _tempControllerConfigEnvironment['default'].podModulePrefix,
    Resolver: _tempControllerResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _tempControllerConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});