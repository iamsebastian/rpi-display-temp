define('temp-controller/tests/helpers/start-app', ['exports', 'ember', 'temp-controller/app', 'temp-controller/config/environment'], function (exports, _ember, _tempControllerApp, _tempControllerConfigEnvironment) {
  exports['default'] = startApp;

  function startApp(attrs) {
    var application = undefined;

    var attributes = _ember['default'].merge({}, _tempControllerConfigEnvironment['default'].APP);
    attributes = _ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    _ember['default'].run(function () {
      application = _tempControllerApp['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }
});