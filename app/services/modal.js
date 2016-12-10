import Ember from 'ember';

export default Ember.Service.extend({
  show: function(popupId) {
    var $popup = Ember.$(`.page-overlay, .popup[data-popup-id=${popupId}]`);
    $popup.addClass('show');
  },

  hide: function() {
    Ember.$('.page-overlay, .popup').removeClass('show');
  },

  // Aliases
  open: function(popupId) {
    this.show(popupId);
  },
  close: function() {
    this.hide();
  },
});
