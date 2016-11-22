import Ember from 'ember';
import config from '../config/environment';

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
    var api = new ripple.RippleAPI({server: config.rippleWS});
    api.connect().then(() => {

      api.on('ledger', ledger => {
        console.log(JSON.stringify(ledger, null, 2));
        this.set('baseFeeXRP', ledger.baseFeeXRP);
        this.set('ledgerHash', ledger.ledgerHash);
        this.set('ledgerVersion', ledger.ledgerVersion);
        this.set('ledgerTimestamp', ledger.ledgerTimestamp);
        this.set('reserveBaseXRP', ledger.reserveBaseXRP);
        this.set('reserveIncrementXRP', ledger.reserveIncrementXRP);
        this.set('ledgerTransactions', ledger.transactionCount);
      });

      /*
        // ledger info
        {
          "baseFeeXRP": "0.00001",
          "ledgerHash": "6066FF5FB3C5A7EDED0967BE9266F669D4BC0AC967AE097B25A1FFC2C43F1CD0",
          "ledgerVersion": 25691584,
          "ledgerTimestamp": "2016-11-21T08:20:10.000Z",
          "reserveBaseXRP": "20",
          "reserveIncrementXRP": "5",
          "transactionCount": 52,
          "validatedLedgerVersions": "25068843-25551326,25551448-25691584"
        }
      */

    });

  }.on('init'),

});
