var fs = require('fs');
var Q = require('q');
var sensorSlaveDir = '/sys/bus/w1/devices/';
var sensorSlaveFile;

function readDirCallback(defered, err, files) {
  sensorSlaveFile = sensorSlaveDir + files[0] + '/w1_slave';
  defered.resolve();
  return;
};

function setSlaveFile() {
  var defered = Q.defer();
  var cb = readDirCallback.bind(this, defered);

  fs.readdir(sensorSlaveDir, cb);
  return defered.promise;
};

function parseTemperature(content) {
  var defered = Q.defer();
  var temp = content
             .toString()
             .split('\n')[1]
             .split('=')[1];

  defered.resolve(temp);
  return defered.promise;
};

function readFile() {
  return Q.nfcall(fs.readFile, sensorSlaveFile);
};

function logTemperature() {
  var defered = Q.defer();
  var temp;

  try {
    tempStr = readFile()
              .then(parseTemperature)
              .then(function(tempStr) {
                temp = parseInt(tempStr, 10);
		defered.resolve(temp);
              });

  } catch (e) {
    throw(e);
  }

  return defered.promise;
};

module.exports = function() {
  return setSlaveFile()
  .then(logTemperature);
};
