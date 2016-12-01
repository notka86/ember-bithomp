import Ember from 'ember';

export default Ember.Route.extend({

  activate: function() {
    this.controllerFor('chart').onStart();
  },

  deactivate: function() {
    this.controllerFor('chart').set('update', false);
  }

});
