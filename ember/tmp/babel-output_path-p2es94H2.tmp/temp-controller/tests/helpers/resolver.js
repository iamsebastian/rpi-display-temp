define('temp-controller/tests/helpers/resolver', ['exports', 'temp-controller/resolver', 'temp-controller/config/environment'], function (exports, _tempControllerResolver, _tempControllerConfigEnvironment) {

  var resolver = _tempControllerResolver['default'].create();

  resolver.namespace = {
    modulePrefix: _tempControllerConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _tempControllerConfigEnvironment['default'].podModulePrefix
  };

  exports['default'] = resolver;
});