import Ember from 'ember';
var dataApi = 'https://data.ripple.com/v2/';

export default Ember.Service.extend({
  ajax: Ember.inject.service(),
  
  //should be replaced with real api call to backend
  issuerName(issuer) {
    let issuerName = issuer.substr(0, 7) + '...';
    if (issuer === 'rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B') {
      issuerName = 'Bitstamp';
    } else if (issuer === 'rhub8VRN55s94qWKDv6jmDy1pUykJzF3wq') {
      issuerName = 'Gatehub';
    } else if (issuer === 'raBDVR7JFq3Yho2jf7mcx36sjTwpRJJrGU') {
      issuerName = 'Bluzelle';
    } else if (issuer === 'rnuF96W4SZoCJmbHYBFoJZpR8eCaxNvekK') {
      issuerName = 'RippleCN';
    } else if (issuer === 'rPxU6acYni7FcXzPCMeaPSwKcuS2GTtNVN') {
      issuerName = 'eXRP';
    } else if (issuer === 'r94s8px6kSw1uZ1MV98dhSRTvc6VMPoPcN') {
      issuerName = 'TokyoJPY';
    } else { //wrong issuer
      if (issuer.substr(0, 1) !== 'r' || issuer.length < 26 || issuer.length > 35 ) {
        issuerName = issuer;
      }
    }
    return issuerName;
  },

  xrpPrice(exchange_currency, exchange_issuer) {
    let reqUrl = dataApi + 'normalize?amount=1&exchange_currency=' + exchange_currency + '&exchange_issuer=' + exchange_issuer;
    return this.get('ajax').request(reqUrl)
    .then((price) => {
      if (price.result) {
        if (price.result !== 'success') {
          if (price.message) {
            console.log('xrp-price ticker error: ' + price.message);
          } else {
            console.log('xrp-price ticker error: ' + price.result);
          }
          return false;
        } else {
          return price.converted;
        }
      } else {
        console.log('xrp-price ticker error: can not fetch data');
        return false;
      }
    }, () => {
      console.log('xrp-price ticker error: server error');
      return false;
    });
  },

  exchangePrice(amount, currency, issuer, exchange_currency, exchange_issuer) {
    exchange_issuer = this.issuerAddress(exchange_issuer);
    let reqUrl = dataApi + 'normalize?amount=' + amount + '&currency=' + currency + '&issuer=' + issuer + '&exchange_currency=' + exchange_currency + '&exchange_issuer=' + exchange_issuer;
    this.get('ajax').request(reqUrl)
    .then((price) => {
      if (price.result) {
        if (price.result !== 'success') {
          if (price.message) {
            console.log('xrp-price ticker error: ' + price.message);
          } else {
            console.log('xrp-price ticker error: ' + price.result);
          }
          return false;
        } else {
          return {
            amount: price.amount,
            converted: price.converted,
            rate: price.rate
          };
        }
      } else {
        console.log('xrp-price ticker error: can not fetch data');
        return false;
      }
    }, () => {
      console.log('xrp-price ticker error: server error');
      return false;
    });
  },

});

/*
{"result":"error","message":"invalid amount"}
{"result":"success","amount":"2000","converted":"12.400599364323527","rate":"0.0062002997"}
{"result":"error","message":"issuer is required"}
{"result":"success","amount":"2000","converted":"0","rate":"0.0000000"}
*/
