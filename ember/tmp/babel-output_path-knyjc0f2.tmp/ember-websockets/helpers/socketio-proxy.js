define('ember-websockets/helpers/socketio-proxy', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  var bind = _ember['default'].run.bind;
  var assert = _ember['default'].assert;
  var ObjectProxy = _ember['default'].ObjectProxy;

  exports['default'] = ObjectProxy.extend({

    /*
    * {
    *    url: 'String'
    *    type: 'String'
    *    callback: The function to envoke
    *    context: The context of the function
    *    ref: The actual callback function with is given to socketio
    * }
    */
    listeners: null,

    init: function init() {
      this._super.apply(this, arguments);
      this.listeners = [];
    },

    /*
    * This method simply passes the arguments to the socketio on method except it binds the callback function to
    * the run loop.
    */
    on: function on(type, callback, context) {
      assert('The second argument must be a function.', typeof callback === 'function');

      var bindedCallback = bind(context, callback);
      this.listeners.push({ url: this.socket.io.uri, type: type, callback: callback, context: context, ref: bindedCallback });
      this.socket.on(type, bindedCallback);
    },

    off: function off(type, callback) {
      var _this = this;

      assert('The second argument must be a function.', typeof callback === 'function');
      var listeners = this.listeners.filter(function (listener) {
        return listener.callback === callback && listener.url === _this.socket.io.url && listener.type === type;
      });

      if (listeners) {
        listeners.forEach(function (item) {
          return _this.socket.off(type, item.ref);
        });
      }

      this.listeners = this.listeners.filter(function (l) {
        return listeners.indexOf(l) === -1;
      });
    },

    /*
    * This method passes the argument to the socketio emit method. If an acknowledgement function is passed then
    * we bind that in a run loop.
    */
    emit: function emit(channel, data, acknowledgementFn, context) {
      if (acknowledgementFn && context) {
        this.socket.emit.call(this.socket, channel, data, bind(context, acknowledgementFn));
      } else {
        this.socket.emit.apply(this.socket, arguments);
      }
    },

    close: function close() {
      var _this2 = this;

      this.listeners = this.listeners.filter(function (listener) {
        return listener.url === _this2.socket.io.url;
      });
      this.socket.close.apply(this.socket, arguments);
    },

    send: function send() {
      this.socket.send.apply(this.socket, arguments);
    },
    connect: function connect() {
      this.socket.connect.apply(this.socket, arguments);
    }
  });
});