import Ember from 'ember';

export default Ember.Controller.extend({

  vasia: function() {
    console.log('Vasia: poehali!');
    var api = new ripple.RippleAPI({server:'wss://s1.ripple.com/'});
    var address = 'rsuUjfWxrACCAwGQDsNeZUhpzXf1n1NK5Z';

    api.connect().then(() => {
      //api.getBalances(address).then(balances => {
      //  console.log(JSON.stringify(balances, null, 2));
      //});

      api.getServerInfo().then(info => {
        console.log(info);
      });

      api.getBalances(address).then(balances => {
        console.log(balances);
      });

      api.getSettings(address).then(settings => {
        console.log(settings);
      });

      api.on('ledger', ledger => {
        console.log(JSON.stringify(ledger, null, 2));
      });

      //api.getAccountInfo(address).then(info => {
      //  console.log(info);
      //});
    });

  }.on('init'),

});
