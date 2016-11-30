import Ember from 'ember';

export default Ember.Route.extend({

  activate: function() {
    this.controllerFor('statistics').onStart();
  },

  deactivate: function() {
    this.controllerFor('statistics').set('update', false);
  }

});
