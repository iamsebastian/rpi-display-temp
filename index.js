var five = require("johnny-five");
var raspi = require("raspi-io");
var digit;
var board = new five.Board({
  debug: true,
  io: new raspi(),
  repl: false
});

var blink = function(pin) {
  //(new five.Led(pin)).blink();
  new five.Led({
    pin: pin
  }).blink();
};

function initDigit() {
  digit = new five.Led.Digits({
    pins: {
      data: 2,
      clock: 3,
      cs: 4
    }
  });
};

board.on('ready', function() {
  var self = this;

  console.log('Board is ready ...');
  blink('GPIO21'); // red 1st
  blink('GPIO22'); // red 1st
  blink('GPIO23'); // red 2nd
  blink('GPIO25'); // yellow 1st (25)
  blink('GPIO18'); // yellow 2nd

  //var led = new five.Led('GPIO18');
  //led.fadeIn();

  this.wait(5000, function() {
    //led.fadeOut();
    console.log('Will now exit ...');
    process.exit();
  });

  //console.log('Will now init MAX7219 digit ...');
  //initDigit();
  //digits.print('foo');
});
