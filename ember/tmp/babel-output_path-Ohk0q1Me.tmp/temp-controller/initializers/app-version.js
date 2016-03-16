define('temp-controller/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'temp-controller/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _tempControllerConfigEnvironment) {
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(_tempControllerConfigEnvironment['default'].APP.name, _tempControllerConfigEnvironment['default'].APP.version)
  };
});