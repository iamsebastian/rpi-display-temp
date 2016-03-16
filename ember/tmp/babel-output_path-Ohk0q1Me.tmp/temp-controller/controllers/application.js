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