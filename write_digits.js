var five = require("johnny-five");
var raspi = require("raspi-io");
var digit;
var board = new five.Board({
  debug: true,
  io: new raspi(),
  repl: false
});

function initDigit() {
  digit = new five.Led.Digits({
    pins: {
      data: 'GPIO24',
      clock: 'GPIO6',
      cs: 'GPIO25'
      //data: 5,
      //clock: 6,
      //cs: 22
    }
  });
  return digit;
};

board.on('ready', function() {
  var digit = initDigit();
  var self = this;

  console.log('Board is ready ...');

  digit.clear();
  digit.on();
  digit.print('----');

  //console.log(digit);

  this.wait(5000, function() {
    console.log('5000ms are over ...');
    //console.log('Will now exit ...');
    //process.exit();
  });
});
