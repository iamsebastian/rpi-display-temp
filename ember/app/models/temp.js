import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  temp: DS.attr('number'),
  tempFloat: Ember.computed('temp', function() {
    return this.get('temp') / 1000;
  })
});
