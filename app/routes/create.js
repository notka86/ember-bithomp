import Ember from 'ember';

export default Ember.Route.extend({

  deactivate: function() {
    this.controller.set('address', '');
    this.controller.set('secret', '');
  }

});
