import Ember from 'ember';

export default Ember.Controller.extend({
  myName: '',
  myMessage: '',
  actualMsg: '',
  msgs: [],
  messages: Ember.A([]),

  //temps: Ember.computed( f

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
    var temp = JSON.parse(event.data);
    //var msgs = this.get('messages');
    console.log(`A temperature appeared: ${event.data}`);

    //msgs.pushObject(temp);

    //if (msgs.length > 100) {
      //msgs.shiftObject();
    //}
    this.store.push({data: [temp]});
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
