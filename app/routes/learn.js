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
      data: [
        {
          id: 1,
          type: 'video',
          attributes: {
            title: "How Ripple Works",
            url: "https://www.youtube.com/watch?v=5e2jDFL1kKI"
          }
        },
        {
          id: 2,
          type: 'video',
          attributes: {
            title: "Competitive Liquidity Options",
            url: "https://www.youtube.com/watch?v=NJm7Msu0Nmk"
          }
        },
        {
          id: 3,
          type: 'video',
          attributes: {
            title: "Retail Remittances",
            url: "https://www.youtube.com/watch?v=ZckgnFDUOU8"
          }
        },
        {
          id: 4,
          type: 'video',
          attributes: {
            title: "Corporate Disbursements",
            url: "https://www.youtube.com/watch?v=BWgCQVEr-rc"
          }
        },
        {
          id: 5,
          type: 'video',
          attributes: {
            title: "Blockchain Demystified",
            url: "https://www.youtube.com/watch?v=LdOcXXB48fI"
          }
        }
      ]
    });

    return this.store.peekAll('video');
  }

});
