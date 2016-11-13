import Ember from 'ember';

export default Ember.Controller.extend({
  rippleData: Ember.inject.service(),

  onStart: function() {

    this.get('rippleData').activatedAccounts()
    .then(accounts => {
      this.set('activatedAccounts', accounts);
    });

    this.get('rippleData').nodes()
    .then(nodes => {
      this.set('nodes', nodes);
    });

    this.get('rippleData').validators()
    .then(validators => {
      this.set('validators', validators);
    });

  }.on('init'),

});
