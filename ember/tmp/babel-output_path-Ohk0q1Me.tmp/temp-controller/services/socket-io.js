define('temp-controller/services/socket-io', ['exports', 'temp-controller/services/websockets', 'ember-websockets/helpers/socketio-proxy'], function (exports, _tempControllerServicesWebsockets, _emberWebsocketsHelpersSocketioProxy) {
  exports['default'] = _tempControllerServicesWebsockets['default'].extend({
    isWebSocketOpen: function isWebSocketOpen(socket) {
      return socket.io.readyState !== 'closed';
    },

    createSocket: function createSocket(url) {
      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      var newSocketIO = io(url, options);
      newSocketIO.connect();
      return newSocketIO;
    },

    createProxy: function createProxy(socket) {
      return _emberWebsocketsHelpersSocketioProxy['default'].create({ content: this, socket: socket });
    }
  });
});