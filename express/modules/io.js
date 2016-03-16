var WebSocketServer = require('ws').Server;
var wss;

var ex = module.exports = {};

ex.listen = function() {
  wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
      client.send(data);
    });
  };

  wss.on('connection', function (socket) {
    wss.broadcast({ will: 'be received by everyone' });

    socket.on('message', function (from, msg) {
      console.log('Message received from: ' + from + '. Message: ' + msg);
    });

    socket.on('disconnect', function () {
      console.log('Somebody disconnected ...');
    });
  });
};

ex.init = function (server) {
  if (!wss) {
    wss = new WebSocketServer({ server: server });
  } else {
    throw new Error('WebSocketServer already initialized.');
  }
};
