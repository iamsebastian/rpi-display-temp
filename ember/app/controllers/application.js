import Ember from 'ember';

export default Ember.Controller.extend({
  myName: '',
  myMessage: '',
  actualMsg: '',
  msgs: [],
  messages: Ember.A([]),

  getTemp: function (msg) {
    let foo;
    let temp = parseInt(msg.attributes.temp, 10);
    let tempStr = `${temp/1000}°C`;
    return tempStr;
  },

  //temps: Ember.computed( f

  init: function() {
    this._super();
    var socket = this.get('websockets').socketFor('ws://192.168.178.37:3000');
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
    //console.log(`A temperature appeared: ${event.data}`);
    this.store.push({data: [temp]});
    this.set('actualTemp', this.getTemp(temp));
  },

  actions: {
    sendMessage: function() {
      var socket = this.get('websockets').socketFor('ws://192.168.178.37:3000');
      var payload = {
        name: this.get('myName'),
        message: this.get('myMessage')
      };

      socket.send(JSON.stringify(payload));
      this.set('myMessage', '');
    }
  }
});
