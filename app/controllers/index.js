import Ember from 'ember';

export default Ember.Controller.extend({
  rippleData: Ember.inject.service(),

  //TODO: checking only once? need updates avery 3-5 seconds. like in xrp-price component
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

    this.get('rippleData').destribution()
    .then(destribution => {
      this.set('lastDistribution', destribution.lastDistribution);
      this.set('prevDistribution', destribution.prevDistribution);
      this.set('heldByOthers', destribution.distributed);
      this.set('heldByRipple', destribution.undistributed);
      this.set('totalXRP', destribution.total);
      this.set('lastDistributed', destribution.lastDistributed);
    });

    //TODO: show on the page. mirage: web-socket
    var api = new ripple.RippleAPI({server:'wss://s1.ripple.com/'});
    api.connect().then(() => {

      api.getServerInfo().then(info => {
        console.log(info);
      });

      api.on('ledger', ledger => {
        console.log(JSON.stringify(ledger, null, 2));
      });

    });

  }.on('init'),

});
