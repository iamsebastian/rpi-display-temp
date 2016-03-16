"use strict";

/* jshint ignore:start */



/* jshint ignore:end */

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
define('temp-controller/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'temp-controller/config/environment'], function (exports, _emberCliAppVersionComponentsAppVersion, _tempControllerConfigEnvironment) {

  var name = _tempControllerConfigEnvironment['default'].APP.name;
  var version = _tempControllerConfigEnvironment['default'].APP.version;

  exports['default'] = _emberCliAppVersionComponentsAppVersion['default'].extend({
    version: version,
    name: name
  });
});
define('temp-controller/controllers/application', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    myName: '',
    myMessage: '',
    messages: _ember['default'].A([]),

    init: function init() {
      this._super();
      var socket = this.get('websockets').socketFor('ws://localhost:3000');
      socket.on('open', this.openHandler, this);
      socket.on('message', this.messageHandler, this);
      socket.on('close', function (event) {
        console.log('closed');
      }, this);
    },

    openHandler: function openHandler(event) {
      console.log('An open event has been socketed: ' + event);
    },

    messageHandler: function messageHandler(event) {
      console.log('A message appeared: ' + event.data);
      this.get('messages').pushObject(JSON.parse(event.data));
    },

    actions: {
      sendMessage: function sendMessage() {
        var socket = this.get('websockets').socketFor('ws://localhost:3000');
        var payload = {
          name: this.get('myName'),
          message: this.get('myMessage')
        };

        socket.send(JSON.stringify(payload));
        this.set('myMessage', '');
      }
    }
  });
});
define('temp-controller/controllers/array', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller;
});
define('temp-controller/controllers/object', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller;
});
define('temp-controller/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _emberInflectorLibHelpersPluralize) {
  exports['default'] = _emberInflectorLibHelpersPluralize['default'];
});
define('temp-controller/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _emberInflectorLibHelpersSingularize) {
  exports['default'] = _emberInflectorLibHelpersSingularize['default'];
});
define('temp-controller/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'temp-controller/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _tempControllerConfigEnvironment) {
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(_tempControllerConfigEnvironment['default'].APP.name, _tempControllerConfigEnvironment['default'].APP.version)
  };
});
define('temp-controller/initializers/container-debug-adapter', ['exports', 'ember-resolver/container-debug-adapter'], function (exports, _emberResolverContainerDebugAdapter) {
  exports['default'] = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _emberResolverContainerDebugAdapter['default']);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('temp-controller/initializers/data-adapter', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `data-adapter` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'data-adapter',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('temp-controller/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data/-private/core'], function (exports, _emberDataSetupContainer, _emberDataPrivateCore) {

  /*
  
    This code initializes Ember-Data onto an Ember application.
  
    If an Ember.js developer defines a subclass of DS.Store on their application,
    as `App.StoreService` (or via a module system that resolves to `service:store`)
    this code will automatically instantiate it and make it available on the
    router.
  
    Additionally, after an application's controllers have been injected, they will
    each have the store made available to them.
  
    For example, imagine an Ember.js application with the following classes:
  
    App.StoreService = DS.Store.extend({
      adapter: 'custom'
    });
  
    App.PostsController = Ember.ArrayController.extend({
      // ...
    });
  
    When the application is initialized, `App.ApplicationStore` will automatically be
    instantiated, and the instance of `App.PostsController` will have its `store`
    property set to that instance.
  
    Note that this code will only be run if the `ember-application` package is
    loaded. If Ember Data is being used in an environment other than a
    typical application (e.g., node.js where only `ember-runtime` is available),
    this code will be ignored.
  */

  exports['default'] = {
    name: 'ember-data',
    initialize: _emberDataSetupContainer['default']
  };
});
define('temp-controller/initializers/export-application-global', ['exports', 'ember', 'temp-controller/config/environment'], function (exports, _ember, _tempControllerConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_tempControllerConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var value = _tempControllerConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_tempControllerConfigEnvironment['default'].modulePrefix);
      }

      if (!window[globalName]) {
        window[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete window[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('temp-controller/initializers/injectStore', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `injectStore` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'injectStore',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('temp-controller/initializers/store', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `store` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'store',
    after: 'ember-data',
    initialize: _ember['default'].K
  };
});
define('temp-controller/initializers/transforms', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `transforms` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'transforms',
    before: 'store',
    initialize: _ember['default'].K
  };
});
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
define("temp-controller/instance-initializers/ember-data", ["exports", "ember-data/-private/instance-initializers/initialize-store-service"], function (exports, _emberDataPrivateInstanceInitializersInitializeStoreService) {
  exports["default"] = {
    name: "ember-data",
    initialize: _emberDataPrivateInstanceInitializersInitializeStoreService["default"]
  };
});
define('temp-controller/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  exports['default'] = _emberResolver['default'];
});
define('temp-controller/router', ['exports', 'ember', 'temp-controller/config/environment'], function (exports, _ember, _tempControllerConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _tempControllerConfigEnvironment['default'].locationType
  });

  Router.map(function () {});

  exports['default'] = Router;
});
define('temp-controller/routes/application', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({});
});
define('temp-controller/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _emberAjaxServicesAjax) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberAjaxServicesAjax['default'];
    }
  });
});
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
define('temp-controller/services/websockets', ['exports', 'ember', 'ember-websockets/helpers', 'ember-websockets/helpers/websocket-proxy'], function (exports, _ember, _emberWebsocketsHelpers, _emberWebsocketsHelpersWebsocketProxy) {
  var Service = _ember['default'].Service;
  var get = _ember['default'].get;
  var set = _ember['default'].set;
  exports['default'] = Service.extend({
    /*
      A hash of open websocket connections. This
      allows multiple components to share the same connection.
       {
        'websocket-url': WebSocket Proxy object
      }
    */
    sockets: null,

    init: function init() {
      this._super.apply(this, arguments);
      set(this, 'sockets', {});
    },

    /*
      socketFor returns a websocket proxy object. On this object there is a property `socket`
      which contains the actual websocket object. This websocket object is cached based off of the url meaning
      multiple requests for the same socket will return the same object.
    */
    socketFor: function socketFor(url) {
      var protocols = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

      /*
        Websockets allows either a string or array of strings to be passed as the second argument.
        Normalize both cases into an array of strings so we can just deal with arrays.
      */
      if (typeof protocols === 'string') {
        protocols = [protocols];
      }

      /*
        Normalize the url as native websockets add a / to the end of the url:
        http://example.com:8000 becomes: http://example.com:8000/
         Since the url will be used as a key will need to make sure that it does not
        contain '.' as it will throw ember off
      */
      var normalizedUrl = (0, _emberWebsocketsHelpers.normalizeURL)(url);
      var cleanedUrl = (0, _emberWebsocketsHelpers.cleanURL)(normalizedUrl);

      /*
       */
      var existingProxy = get(this, 'sockets.' + cleanedUrl);

      if (existingProxy && this.isWebSocketOpen(existingProxy.socket)) {
        return existingProxy;
      }

      /*
        we can get to this place if the websocket has been closed and we are trying to reopen
        or we are creating a proxy for the first time
      */
      var newWebSocket = this.createSocket(normalizedUrl, protocols);

      if (existingProxy) {
        /*
          If there is an existing socket in place we simply update the websocket object and not
          the whole proxy as we dont want to destroy the previous listeners.
        */
        existingProxy.socket = newWebSocket;
        return existingProxy;
      }

      var newProxy = this.createProxy(newWebSocket, protocols);

      set(this, 'sockets.' + cleanedUrl, newProxy);

      return newProxy;
    },

    closeSocketFor: function closeSocketFor(url) {
      var cleanedUrl = (0, _emberWebsocketsHelpers.cleanURL)((0, _emberWebsocketsHelpers.normalizeURL)(url));
      get(this, 'sockets.' + cleanedUrl).socket.close();
    },

    isWebSocketOpen: function isWebSocketOpen(websocket) {
      return websocket.readyState !== WebSocket.CLOSED;
    },

    createSocket: function createSocket(url, options) {
      return new WebSocket(url, options);
    },

    createProxy: function createProxy(socket, protocols) {
      return _emberWebsocketsHelpersWebsocketProxy['default'].create({ content: this, protocols: protocols, socket: socket });
    }
  });
});
define("temp-controller/templates/application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.2",
          "loc": {
            "source": null,
            "start": {
              "line": 8,
              "column": 2
            },
            "end": {
              "line": 10,
              "column": 2
            }
          },
          "moduleName": "temp-controller/templates/application.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("li");
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode(" says \"");
          dom.appendChild(el1, el2);
          var el2 = dom.createComment("");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\"");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(2);
          morphs[0] = dom.createMorphAt(element0, 0, 0);
          morphs[1] = dom.createMorphAt(element0, 2, 2);
          return morphs;
        },
        statements: [["content", "message.name", ["loc", [null, [9, 8], [9, 24]]]], ["content", "message.message", ["loc", [null, [9, 31], [9, 50]]]]],
        locals: [],
        templates: []
      };
    })();
    var child1 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.4.2",
          "loc": {
            "source": null,
            "start": {
              "line": 10,
              "column": 2
            },
            "end": {
              "line": 12,
              "column": 2
            }
          },
          "moduleName": "temp-controller/templates/application.hbs"
        },
        isEmpty: false,
        arity: 0,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("    ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("li");
          var el2 = dom.createTextNode("No messages appeared until now.");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: [],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.4.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 18,
            "column": 0
          }
        },
        "moduleName": "temp-controller/templates/application.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("h2");
        dom.setAttribute(el1, "id", "title");
        var el2 = dom.createTextNode("Welcome to Ember");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        var el2 = dom.createElement("strong");
        var el3 = dom.createTextNode("What's your name?");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        var el2 = dom.createElement("ul");
        var el3 = dom.createTextNode("\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("button");
        var el2 = dom.createTextNode("Send message");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element1 = dom.childAt(fragment, [12]);
        var morphs = new Array(5);
        morphs[0] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        morphs[1] = dom.createMorphAt(dom.childAt(fragment, [6]), 0, 0);
        morphs[2] = dom.createMorphAt(dom.childAt(fragment, [8, 0]), 1, 1);
        morphs[3] = dom.createMorphAt(fragment, 10, 10, contextualElement);
        morphs[4] = dom.createElementMorph(element1);
        return morphs;
      },
      statements: [["content", "outlet", ["loc", [null, [2, 0], [2, 10]]]], ["inline", "input", [], ["value", ["subexpr", "@mut", [["get", "myName", ["loc", [null, [5, 20], [5, 26]]]]], [], []], "placeholder", "Enter your name here"], ["loc", [null, [5, 5], [5, 64]]]], ["block", "each", [["get", "message", ["loc", [null, [8, 10], [8, 17]]]], ["get", "in", ["loc", [null, [8, 18], [8, 20]]]], ["get", "messages", ["loc", [null, [8, 21], [8, 29]]]]], [], 0, 1, ["loc", [null, [8, 2], [12, 11]]]], ["inline", "input", [], ["value", ["subexpr", "@mut", [["get", "myMessage", ["loc", [null, [15, 14], [15, 23]]]]], [], []], "placeholder", "Enter your message here"], ["loc", [null, [15, 0], [15, 63]]]], ["element", "action", ["sendMessage"], [], ["loc", [null, [17, 8], [17, 34]]]]],
      locals: [],
      templates: [child0, child1]
    };
  })());
});
/* jshint ignore:start */



/* jshint ignore:end */

/* jshint ignore:start */

define('temp-controller/config/environment', ['ember'], function(Ember) {
  var prefix = 'temp-controller';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

/* jshint ignore:end */

/* jshint ignore:start */

if (!runningTests) {
  require("temp-controller/app")["default"].create({"name":"temp-controller","version":"0.0.0+f13df330"});
}

/* jshint ignore:end */
//# sourceMappingURL=temp-controller.map