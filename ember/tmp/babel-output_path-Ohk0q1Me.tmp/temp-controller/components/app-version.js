define('temp-controller/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'temp-controller/config/environment'], function (exports, _emberCliAppVersionComponentsAppVersion, _tempControllerConfigEnvironment) {

  var name = _tempControllerConfigEnvironment['default'].APP.name;
  var version = _tempControllerConfigEnvironment['default'].APP.version;

  exports['default'] = _emberCliAppVersionComponentsAppVersion['default'].extend({
    version: version,
    name: name
  });
});