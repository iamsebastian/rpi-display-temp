import Ember from 'ember';

export default Ember.Component.extend({
  //data: Ember.computed('model', function() {
    //return {
      //labels: [],
      //datasets: [{
        //label: 'ThisLabel',
        //data: this.get('model').mapBy('temp')
      //}]
    //}
  //}),
  temps: Ember.computed('model', function () {
    return {
      //labels: [],
      //labels: this.get('model').mapBy('id'),
      labels: [],
      datasets: [{
        //label: this.get('model.id'),
        label: 'A data set.',
        //data: [this.get('model.temp')]
        data: this.get('model').mapBy('temp')
      }]
    };
  }),

  eachTemps: Ember.computed('model.[]', function () {
    //var models = this.get('model');
    var lastId = this.get('model').lastObject.id;
    var models = this.get('model')
    .filterBy('id', function (id) {
      return id - 30 > lastId;
    });
    //var models = this.store.query('temp', {
      //filter: {

      //}
    //}
    return {
      labels: models.mapBy('id'),
      datasets: [{
        label: 'A data set.',
        data: models.mapBy('temp')
      }]
    };
  }),

  actions: {
    logData: function () {
      console.log(this.get('model')[0])
    }
  }
});
