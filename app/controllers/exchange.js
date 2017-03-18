import Ember from 'ember';
//import config from '../config/environment';

export default Ember.Controller.extend({

  types: [
    {
      title: 'I want to BUY a specific amount',
      value: 'buy'
    },
    {
      title: 'I want to PAY a specific amount',
      value: 'sell'
    }
  ],

  /*
  onStart: function() {
    var api = new ripple.RippleAPI({server: config.RippleWS});
    var address = 'rsuUjfWxrACCAwGQDsNeZUhpzXf1n1NK5Z';

    api.connect().then(() => {
      api.getBalances(address).then(balances => {
        console.log(JSON.stringify(balances, null, 2));
      });

      api.getSettings(address).then(settings => {
        console.log(JSON.stringify(settings, null, 2));
      });

      api.getAccountInfo(address).then(info => {
        console.log(JSON.stringify(info, null, 2));
      });
    });

  }.on('init'),
  */

});
