define('temp-controller/router', ['exports', 'ember', 'temp-controller/config/environment'], function (exports, _ember, _tempControllerConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _tempControllerConfigEnvironment['default'].locationType
  });

  Router.map(function () {});

  exports['default'] = Router;
});