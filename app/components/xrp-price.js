import Ember from 'ember';

export default Ember.Component.extend({
  rippleData: Ember.inject.service(),

  didInsertElement: function() {
    this.set('live', true);
    this.checkTicker();
    this.poll();
  },

  willDestroyElement: function() {
    this.set('live', false);
  },

  poll: function() {
    if (this.get('live')) {
      Ember.run.later(this,(function() {
        this.checkTicker();
        this.poll();
        console.log('polling'); //DELETE
      }), 3000);
    }
  },

  checkTicker: function() {
    this.get('rippleData').xrpPrice(this.get('currency'), this.get('issuer'))
    .then((rate) => {
      if (this.get('live')) {
        this.set('rate', rate);
      }
    });
  }

});
