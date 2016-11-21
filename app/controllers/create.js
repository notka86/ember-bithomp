import Ember from 'ember';
//var count = 1;

export default Ember.Controller.extend({

  actions: {
    newRipple() {
      this.set('process', true);
      var api = new ripple.RippleAPI();
      var account = api.generateAddress();
      this.set('address', account.address);
      this.set('secret', account.secret);
      this.set('process', false);
    }
  }
  
  // for creating nice accounts:
  /* 
    generate: function() {
      count = count + 1;
      var api = new ripple.RippleAPI({});

      var account = api.generateAddress();
      console.log(count);
      var string = account.address;
      var result = string.match(/ripple/i);
      var result2 = string.match(/ihomp/i);
      var result3 = string.match(/slava/i);
      var result4 = string.match(/safello/i);
      var result5 = string.match(/bithomp/i);
      var result6 = string.match(/russian/i);

      if (result || result2 || result3 || result4 || result5 || result6) {
        console.log(account.address);
        console.log(account.secret);
      } else {
        this.generate();
      }
    },
  */

});
