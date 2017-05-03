import Ember from 'ember';
import config from '../config/environment';

export default Ember.Component.extend({
  rippleData: Ember.inject.service(),
  classNames: ['xrp-price', 'table-row'],

  color: 'blue',

  didInsertElement: function() {
    this.set('live', true);
    this.checkTicker();
    if (config.environment !== 'development') {
      this.poll();
    }
  },

  willDestroyElement: function() {
    this.set('live', false);
  },

  poll: function() {
    if (this.get('live')) {
      Ember.run.later(this,(function() {
        this.checkTicker();
        this.poll();
      }), 3000);
    }
  },

  name: function() {
    return this.get('rippleData').issuerName(this.get('issuer'));
  }.property('issuer'),

  chartLink: function() {
    let server = 'https://bithomp.com';
    let link = server + '/priceticker/embed/pricechart?theme=light&type=line&counter={"currency":"';
    link = link + this.get('currency') + '","issuer":"' + this.get('issuer') + '"}&base={"currency":"XRP"}';
    return link;
  }.property('issuer', 'currency'),

  checkTicker: function() {
    let oldRate = this.get('rate');
    this.get('rippleData').xrpPrice(this.get('currency'), this.get('issuer'))
    .then((rate) => {
      if ( this.get('live') && rate > 0 ) {
        this.set('rate', rate);
        if (oldRate > rate) {
          this.set('color', 'orange');
        } else if (oldRate < rate) {
          this.set('color', 'green');
        } else {
          this.set('color', 'blue');
        }
      } else {
        this.set('rate', 'updating...');
      }
    });
  }

});
