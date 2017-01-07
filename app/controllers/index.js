import Ember from 'ember';
import config from '../config/environment';

export default Ember.Controller.extend({
  rippleData: Ember.inject.service(),
  ajax: Ember.inject.service(),

  onStart: function() {

    this.set('update', true);
    this.send('updateInfo');
    if (config.environment !== 'development') {
      this.infoUpdate();
    }

  },

  exploredProcent: function() {
    let explored = this.get('explored');
    let accounts = this.get('activatedAccounts');
    if (explored > 0 && accounts > 0) {
      return Math.round((explored/accounts) * 10000) / 100;
    }
    return false;
  }.property('explored', 'activatedAccounts'),

  activatedProcent: function() {
    let activated = this.get('activated');
    let accounts = this.get('activatedAccounts');
    if (activated > 0 && accounts > 0) {
      return Math.round((activated/accounts) * 10000) / 100;
    }
    return false;
  }.property('activated', 'activatedAccounts'),

  infoUpdate: function() {
    if (this.get('update')) {
      Ember.run.later(this, function() {
        this.send('updateInfo');
        this.infoUpdate();
      }, 3000);
    }
  },

  actions: {

    updateInfo: function() {

      //make a model :)
      this.get('ajax').request('/statistics')
      .then((data) => {
        this.set('explored', data.explored);
        this.set('activated', data.activated);
      });
      
      this.get('rippleData').activatedAccounts()
      .then(accounts => {
        this.set('activatedAccounts', accounts);
      });

    }
  }

});
