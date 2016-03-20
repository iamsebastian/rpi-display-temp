var getTemp = require('./lib/read_temp');
var q = require('q');
var five = require("johnny-five");
var raspi = require("raspi-io");
var board = new five.Board({
  debug: true,
  io: new raspi(),
  repl: true
});

function initDigit() {
  digit = new five.Led.Digits({
    pins: {
      data: 'GPIO10',
      clock: 'GPIO11',
      cs: 'GPIO8'
      //data: 3,
      //clock: 4,
      //cs: 5
    }
  });
  return digit;
};

function writeTemp(digit) {
  //console.log('Get temperature ...');
  getTemp()
  .then(function(temp) {
    //console.log('Got temperature: ', temp);
    digit.print('' + temp + '   ');
    writeTemp(digit);
  });
};

board.on('ready', function() {
  var digit = initDigit();
  var self = this;

  console.log('Board is ready ...');

  //writeTemp(digit);
  this.repl.inject({
    digit: digit
  });

  //digit.clear();
  //digit.print();
  //digit.brightness(80);
  //digit.print(12345678);

  //console.log(digit);
  //this.wait(2000, function() {
    //digit.print('.-.-.-.-.-.-.-.-');
  //});

  //this.wait(5000, function() {
    //digit.print('12345678');
    //console.log('5000ms are over ...');
    //console.log('Will now exit ...');
    //process.exit();
  //});

  //this.wait(8000, function() {
    //digit.print('00--00--');
    //console.log('8000ms are over ...');
  //});
});
