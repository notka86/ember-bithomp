import Ember from 'ember';

export default Ember.Controller.extend({
  modal: Ember.inject.service(),

  actions: {
    hidePopup: function() {
      this.get('modal').close();
    }
  }
});
