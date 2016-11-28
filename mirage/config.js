import config from '../config/environment';

export default function() {
  var rippleApi = 'https://data.ripple.com/v2/';

  this.urlPrefix = config.apiServer;    // make this `http://localhost:8080`, for example, if your API is on a different server
  this.namespace = config.apiNamespace; // make this `api`, for example, if your API is namespaced
  // this.timing = 400;                 // delay for each request, automatically set to 0 during testing

  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    http://www.ember-cli-mirage.com/docs/v0.2.x/shorthands/
  */

  //this.passthrough('https://bithomp.com/api/statistics');

  this.get('/statistics', function() {
    return {"explored":81664};
  });

  //rippleDATA

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

  this.get(rippleApi + 'network/xrp_distribution', function() {
    return {"result":"success","count":22,"rows":[{"date":"2016-06-05T00:00:00Z","distributed":"35108326973","total":"99997364318","undistributed":"64889037345"},{"date":"2016-06-12T00:00:00Z","distributed":"35108308819","total":"99997344164","undistributed":"64889035345"},{"date":"2016-06-19T00:00:00Z","distributed":"35345983560","total":"99997334029","undistributed":"64651350469"},{"date":"2016-06-26T00:00:00Z","distributed":"35345971933","total":"99997322412","undistributed":"64651350479"},{"date":"2016-07-10T00:00:00Z","distributed":"35438257609","total":"99997298223","undistributed":"64559040614"},{"date":"2016-07-17T00:00:00Z","distributed":"35550142696","total":"99997287560","undistributed":"64447144863"},{"date":"2016-07-24T00:00:00Z","distributed":"35550137658","total":"99997278944","undistributed":"64447141285"},{"date":"2016-07-31T00:00:00Z","distributed":"35557883251","total":"99997268571","undistributed":"64439385320"},{"date":"2016-08-07T00:00:00Z","distributed":"35558046921","total":"99997254213","undistributed":"64439207292"},{"date":"2016-08-14T00:00:00Z","distributed":"35562073617","total":"99997236182","undistributed":"64435162564"},{"date":"2016-08-21T00:00:00Z","distributed":"35562730335","total":"99997221224","undistributed":"64434490888"},{"date":"2016-08-28T00:00:00Z","distributed":"35316813001","total":"99997213110","undistributed":"64680400109"},{"date":"2016-09-04T00:00:00Z","distributed":"35317458440","total":"99997205581","undistributed":"64679747140"},{"date":"2016-09-11T00:00:00Z","distributed":"35457828433","total":"99997198432","undistributed":"64539369999"},{"date":"2016-09-18T00:00:00Z","distributed":"35458607580","total":"99997188876","undistributed":"64538581296"},{"date":"2016-09-25T00:00:00Z","distributed":"35475196836","total":"99997179232","undistributed":"64521982395"},{"date":"2016-10-02T00:00:00Z","distributed":"35475802044","total":"99997158326","undistributed":"64521356281"},{"date":"2016-10-09T00:00:00Z","distributed":"35475773335","total":"99997129616","undistributed":"64521356281"},{"date":"2016-10-16T00:00:00Z","distributed":"35488165563","total":"99997086871","undistributed":"64508921308"},{"date":"2016-10-23T00:00:00Z","distributed":"35531082209","total":"99997043143","undistributed":"64465960934"},{"date":"2016-10-30T00:00:00Z","distributed":"35649569539","total":"99997006553","undistributed":"64347437014"},{"date":"2016-11-06T00:00:00Z","distributed":"35765131899","total":"99996972820","undistributed":"64231840920"}]};
  });

  //this.passthrough('https://data.ripple.com/**');

}
