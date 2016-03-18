import Ember from 'ember';

export default Ember.Component.extend({
  chartOptions: {
    // Animation will decrease performance to null.
    animation: false,
    animationSteps: 5,
    scaleOverride: true,
    //scaleBeginAtZero: true,
    scaleStartValue: 15,
    scaleSteps: 9,
    scaleStepWidth: 10,
    scaleIntegersOnly: true,
    // Grid and legend.
    showScale: true
  },

  height: 320,
  width: 960,

  eachTemps: Ember.computed('model.[]', function () {
    var lastId = parseInt(this.get('model.lastObject.id'), 10);
    var models = this.get('model').filter(function (temp) {
      return parseInt(temp.id, 10) > lastId - 60;
    });
    var getColor = function (opac) {
      return `rgba(95, 177, 160, ${opac})`;
    };

    return {
      labels: models.mapBy('id'),
      datasets: [{
        label: 'A data set.',
        data: models.mapBy('tempFloat'),
        fillColor: getColor('.4'),
        scaleLineColor: '#fff',
        scaleFontColor: '#fff',
        strokeColor: getColor('.6'),
        pointColor: getColor('.7'),
        pointStrokeColor: "#eee",
        pointHighlightFill: "#eee",
        pointHighlightStroke: getColor('.8')
      }],
    };
  }),

  each60sTemps: Ember.computed('model.[]', function () {
    var models = this.get('model').filter(function (temp) {
      return parseInt(temp.id, 10) % 60 === 0;
    });
    var getColor = function (opac) {
      return `rgba(179, 145, 45, ${opac})`;
    };

    return {
      labels: models.mapBy('id'),
      datasets: [{
        label: 'A data set.',
        data: models.mapBy('tempFloat'),
        fillColor: getColor('.4'),
        scaleLineColor: '#fff',
        scaleFontColor: '#fff',
        strokeColor: getColor('.6'),
        pointColor: getColor('.7'),
        pointStrokeColor: "#eee",
        pointHighlightFill: "#eee",
        pointHighlightStroke: getColor('.8')
      }],
    };
  }),

  actions: {
    logData: function () {
      console.log(this.get('model')[0]);
    }
  }
});
