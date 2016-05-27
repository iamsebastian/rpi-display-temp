var fs = require('fs');
var Q = require('q');

var sensorSlaveDir = '/sys/bus/w1/devices/';
var sensorSlaveFile;

function filterDirs(dirName) {
  return /^28/.test(dirName);
};

function addSomeRandom (tempAsStr) {
  var temp = parseInt(tempAsStr, 10);
  return temp;
}

function readDirCallback(defered, err, dirs) {
  dirs = dirs.filter(filterDirs);
  sensorSlaveFile = sensorSlaveDir + dirs[0] + '/w1_slave';
  defered.resolve(sensorSlaveFile);
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

function readFile(sensorSlaveFile) {
  return Q.nfcall(fs.readFile, sensorSlaveFile);
};

function logTemperature(sensorSlaveFile) {
  var defered = Q.defer();
  var temp;

  try {
    tempStr = readFile(sensorSlaveFile)
              .then(parseTemperature)
              .then(function(tempStr) {
                temp = addSomeRandom(tempStr);
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
