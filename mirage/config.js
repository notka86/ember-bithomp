export default function() {
  var rippleApi = 'https://data.ripple.com/v2/';
  var rippleMirage = true;

  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  this.namespace = 'api';    // make this `api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    http://www.ember-cli-mirage.com/docs/v0.2.x/shorthands/
  */

  this.get('/statistics', function() {
    return {
      statistics: [
        {id: 1, explored: 67800}
      ]
    };
  });

  if (rippleMirage) {

    this.get(rippleApi + 'normalize', function(db, request) {
      let currency = request.queryParams.exchange_currency;
      if (currency === 'USD') {
        return {"result":"success","amount":"1","converted":"0.008111557759033503","rate":"0.0081115578"};
      } else if (currency === 'EUR') {
        return {"result":"success","amount":"1","converted":"0.00761574337934101","rate":"0.0076157434"};
      } else if (currency === 'JPY') {
        return {"result":"success","amount":"1","converted":"0.8587817520368757","rate":"0.85878175"};
      } else if (currency === 'CNY') {
        return {"result":"success","amount":"1","converted":"0.06181838530901327","rate":"0.061818385"};
      } else if (currency === 'KRW') {
        return {"result":"success","amount":"1","converted":"10.368546133463816","rate":"10.368546"};
      }
      return {};
    });

    this.get(rippleApi + 'accounts', function() {
      return {"result":"success","count":228023};
    });

    this.get(rippleApi + 'network/topology/nodes', function() {
      return {"result":"success","date":"2016-11-08T20:07:21Z","count":125,"nodes":[{}]};
    });

    this.get(rippleApi + 'network/validators', function() {
      return {"result":"success","count":241,"validators":[{}]};
    });

  } else {
    this.passthrough('https://data.ripple.com/**');
  }

}
