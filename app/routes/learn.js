import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    /*
    return this.store.findAll('video')
    .then(function(list) {
      return list;
    }, function() {
      console.log('videos not found');
    });
    */

    this.store.push({
      data: [{
        id: 1,
        type: 'video',
        attributes: {
          title: "Competitive Liquidity Options",
          url: "https://www.youtube.com/watch?v=NJm7Msu0Nmk"
        }
      },
      {
        id: 2,
        type: 'video',
        attributes: {
          title: "Retail Remittances",
          url: "https://www.youtube.com/watch?v=ZckgnFDUOU8"
        }
      },
      {
        id: 3,
        type: 'video',
        attributes: {
          title: "Corporate Disbursements",
          url: "https://www.youtube.com/watch?v=BWgCQVEr-rc"
        }
      } ]
    });

    return this.store.peekAll('video');
  }

});
