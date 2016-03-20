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
define('temp-controller/components/ember-chart', ['exports', 'ember-cli-chart/components/ember-chart'], function (exports, _emberCliChartComponentsEmberChart) {
  exports['default'] = _emberCliChartComponentsEmberChart['default'];
});
define('temp-controller/components/line-chart', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Component.extend({
    chartOptions: {
      // Animation will decrease performance to null.
      animation: false,
      animationSteps: 5,
      scaleOverride: true,
      //scaleBeginAtZero: true,
      scaleStartValue: 15,
      scaleSteps: 9,
      scaleStepWidth: 10,
      scaleIntegersOnly: true,
      // Grid and legend.
      showScale: true
    },

    height: 320,
    width: 960,

    eachTemps: _ember['default'].computed('model.[]', function () {
      var lastId = parseInt(this.get('model.lastObject.id'), 10);
      var models = this.get('model').filter(function (temp) {
        return parseInt(temp.id, 10) > lastId - 60;
      });
      var getColor = function getColor(opac) {
        return 'rgba(95, 177, 160, ' + opac + ')';
      };

      return {
        labels: models.mapBy('id'),
        datasets: [{
          label: 'A data set.',
          data: models.mapBy('tempFloat'),
          fillColor: getColor('.4'),
          scaleLineColor: '#fff',
          scaleFontColor: '#fff',
          strokeColor: getColor('.6'),
          pointColor: getColor('.7'),
          pointStrokeColor: "#eee",
          pointHighlightFill: "#eee",
          pointHighlightStroke: getColor('.8')
        }]
      };
    }),

    each60sTemps: _ember['default'].computed('model.[]', function () {
      var models = this.get('model').filter(function (temp) {
        return parseInt(temp.id, 10) % 60 === 0;
      });
      var getColor = function getColor(opac) {
        return 'rgba(179, 145, 45, ' + opac + ')';
      };

      return {
        labels: models.mapBy('id'),
        datasets: [{
          label: 'A data set.',
          data: models.mapBy('tempFloat'),
          fillColor: getColor('.4'),
          scaleLineColor: '#fff',
          scaleFontColor: '#fff',
          strokeColor: getColor('.6'),
          pointColor: getColor('.7'),
          pointStrokeColor: "#eee",
          pointHighlightFill: "#eee",
          pointHighlightStroke: getColor('.8')
        }]
      };
    }),

    actions: {
      logData: function logData() {
        console.log(this.get('model')[0]);
      }
    }
  });
});
define('temp-controller/controllers/application', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller.extend({
    myName: '',
    myMessage: '',
    actualMsg: '',
    msgs: [],
    messages: _ember['default'].A([]),

    getTemp: function getTemp(msg) {
      var foo = undefined;
      var temp = parseInt(msg.attributes.temp, 10);
      var tempStr = temp / 1000 + '°C';
      return tempStr;
    },

    //temps: Ember.computed( f

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
      var temp = JSON.parse(event.data);
      //console.log(`A temperature appeared: ${event.data}`);
      this.store.push({ data: [temp] });
      this.set('actualTemp', this.getTemp(temp));
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
define('temp-controller/models/temp', ['exports', 'ember-data', 'ember'], function (exports, _emberData, _ember) {
  exports['default'] = _emberData['default'].Model.extend({
    temp: _emberData['default'].attr('number'),
    tempFloat: _ember['default'].computed('temp', function () {
      return this.get('temp') / 1000;
    })
  });
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
  exports['default'] = _ember['default'].Route.extend({
    model: function model() {
      return this.store.peekAll('temp');
    }
  });
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
              "line": 10,
              "column": 4
            },
            "end": {
              "line": 11,
              "column": 4
            }
          },
          "moduleName": "temp-controller/templates/application.hbs"
        },
        isEmpty: true,
        arity: 1,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          return el0;
        },
        buildRenderNodes: function buildRenderNodes() {
          return [];
        },
        statements: [],
        locals: ["model"],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "triple-curlies"
        },
        "revision": "Ember@2.4.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 14,
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
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "container");
        var el2 = dom.createTextNode("\n  ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("div");
        dom.setAttribute(el2, "class", "row");
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h3");
        var el4 = dom.createElement("small");
        var el5 = dom.createTextNode("Aktuelle Temperatur:");
        dom.appendChild(el4, el5);
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode(" ");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n    ");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n\n");
        dom.appendChild(el2, el3);
        var el3 = dom.createComment("");
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("  ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0, 1]);
        var morphs = new Array(4);
        morphs[0] = dom.createMorphAt(element0, 1, 1);
        morphs[1] = dom.createMorphAt(dom.childAt(element0, [3]), 2, 2);
        morphs[2] = dom.createMorphAt(element0, 5, 5);
        morphs[3] = dom.createMorphAt(element0, 7, 7);
        return morphs;
      },
      statements: [["content", "outlet", ["loc", [null, [3, 4], [3, 14]]]], ["content", "actualTemp", ["loc", [null, [5, 44], [5, 58]]]], ["inline", "line-chart", [], ["model", ["subexpr", "@mut", [["get", "model", ["loc", [null, [7, 23], [7, 28]]]]], [], []]], ["loc", [null, [7, 4], [7, 30]]]], ["block", "each", [["get", "model", ["loc", [null, [10, 12], [10, 17]]]]], [], 0, null, ["loc", [null, [10, 4], [11, 13]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("temp-controller/templates/components/line-chart", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type", "multiple-nodes"]
        },
        "revision": "Ember@2.4.2",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 17,
            "column": 0
          }
        },
        "moduleName": "temp-controller/templates/components/line-chart.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode(" ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode(" ");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("br");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        morphs[1] = dom.createMorphAt(fragment, 8, 8, contextualElement);
        morphs[2] = dom.createMorphAt(fragment, 11, 11, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["inline", "ember-chart", [], ["type", "Line", "data", ["subexpr", "@mut", [["get", "eachTemps", ["loc", [null, [1, 31], [1, 40]]]]], [], []], "options", ["subexpr", "@mut", [["get", "chartOptions", ["loc", [null, [1, 49], [1, 61]]]]], [], []], "width", ["subexpr", "@mut", [["get", "width", ["loc", [null, [1, 68], [1, 73]]]]], [], []], "height", ["subexpr", "@mut", [["get", "height", ["loc", [null, [1, 81], [1, 87]]]]], [], []]], ["loc", [null, [1, 0], [1, 89]]]], ["inline", "ember-chart", [], ["type", "Line", "data", ["subexpr", "@mut", [["get", "each60sTemps", ["loc", [null, [5, 31], [5, 43]]]]], [], []], "options", ["subexpr", "@mut", [["get", "chartOptions", ["loc", [null, [5, 52], [5, 64]]]]], [], []], "width", ["subexpr", "@mut", [["get", "width", ["loc", [null, [5, 71], [5, 76]]]]], [], []], "height", ["subexpr", "@mut", [["get", "height", ["loc", [null, [5, 84], [5, 90]]]]], [], []]], ["loc", [null, [5, 0], [5, 92]]]], ["content", "yield", ["loc", [null, [16, 0], [16, 9]]]]],
      locals: [],
      templates: []
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
  require("temp-controller/app")["default"].create({"name":"temp-controller","version":"0.0.0+85044e62"});
}

/* jshint ignore:end */
//# sourceMappingURL=temp-controller.map