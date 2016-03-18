var WebSocketServer = require('ws').Server;
var wss;
var readTemp = require('../../lib/read_temp.js');
var counter = 0;

var temperatures = [];

var ex = module.exports = {};

var initialSendLastMinuteTemps = function (socket) {
  temperatures.forEach(function (_temp) {
    if (_temp.id % 60 === 0) {
      socket.send(JSON.stringify(_temp));
    }
  });
};

var initialSendLast60Temps = function (socket) {
  temperatures.forEach(function (_temp) {
    if (_temp.id > counter - 60) {
      socket.send(JSON.stringify(_temp));
    }
  });
};

var tempToModel = function (temp) {
  return {
    id: counter++,
    type: 'temp',
    attributes: {
      temp: temp
    },
    relationships: {}
  }
};

var addTemperature = function (temp) {
  temperatures.push(tempToModel(temp));
};

var readTempNow = function() {
  readTemp().then(function gotTemp(temp) {
    /*
     *if(temperatures.length > 100) {
     *  temperatures.shift();
     *}
     */
    temp = tempToModel(temp);
    temperatures.push(temp);
    wss.broadcast(temp);
    setTimeout(readTempNow, 850);
  });
}

ex.listen = function() {
  wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
      client.send(JSON.stringify(data));
    });
  };

  readTempNow();

  wss.on('connection', function (socket) {
    //wss.broadcast({ name: 'admin',  message: 'One joined the chat.' });

    initialSendLast60Temps(socket);
    initialSendLastMinuteTemps(socket);

    socket.on('message', function (msg, msgObj) {
      msg = JSON.parse(msg);
      console.log('Message received from: ' + msg.name + '. Message: ' + msg.message);
      //wss.broadcast(msg);
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
