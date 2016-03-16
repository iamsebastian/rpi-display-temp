define('temp-controller/initializers/websocket', ['exports'], function (exports) {
  exports.initialize = initialize;

  function initialize() /* application */{
    // application.inject('route', 'foo', 'service:foo');
  }

  exports['default'] = {
    name: 'websocket',
    initialize: function initialize(app) {
      app.inject('controller', 'websockets', 'service:websockets');
    }
  };
});