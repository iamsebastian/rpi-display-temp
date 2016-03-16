import Ember from 'ember';

export default Ember.Controller.extend({
  myName: '',
  myMessage: '',
  messages: Ember.A([]),

  init: function() {
    this._super();
    var socket = this.get('websockets').socketFor('ws://localhost:3000');
    socket.on('open', this.openHandler, this);
    socket.on('message', this.messageHandler, this);
    socket.on('close', function(event) {
      console.log('closed');
    }, this);
  },

  openHandler: function(event) {
    console.log(`An open event has been socketed: ${event}`);
  },

  messageHandler: function(event) {
    console.log(`A message appeared: ${event.data}`);
    this.get('messages').pushObject(JSON.parse(event.data));
  },

  actions: {
    sendMessage: function() {
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
