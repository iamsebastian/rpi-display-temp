define('temp-controller/tests/unit/initializers/websocket-test', ['exports', 'ember', 'temp-controller/initializers/websocket', 'qunit'], function (exports, _ember, _tempControllerInitializersWebsocket, _qunit) {

  var application = undefined;

  (0, _qunit.module)('Unit | Initializer | websocket', {
    beforeEach: function beforeEach() {
      _ember['default'].run(function () {
        application = _ember['default'].Application.create();
        application.deferReadiness();
      });
    }
  });

  // Replace this with your real tests.
  (0, _qunit.test)('it works', function (assert) {
    _tempControllerInitializersWebsocket['default'].initialize(application);

    // you would normally confirm the results of the initializer here
    assert.ok(true);
  });
});