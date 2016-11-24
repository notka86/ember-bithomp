import Ember from 'ember';

export default Ember.Route.extend({

  activate: function() {
    this.controllerFor('index').onStart();
  },

  deactivate: function() {
    this.controllerFor('index').set('update', false);
  }

});
