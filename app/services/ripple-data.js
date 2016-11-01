import Ember from 'ember';
var dataApi = 'https://data.ripple.com/v2/';

export default Ember.Service.extend({
  ajax: Ember.inject.service(),

  issuerAddress(issuerName) {
    let issuer = 'rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B'; //Bitstamp default
    if (issuerName === 'Bitstamp') {
      issuer = 'rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B';
    } else if (issuerName === 'Gatehub') {
      issuer = 'rhub8VRN55s94qWKDv6jmDy1pUykJzF3wq';
    } else if (issuerName === 'Bluzelle') {
       issuer = 'raBDVR7JFq3Yho2jf7mcx36sjTwpRJJrGU';
    } else if (issuerName === 'RippleCN') {
      issuer = 'rnuF96W4SZoCJmbHYBFoJZpR8eCaxNvekK';
    } else if (issuerName === 'eXRP') {
      issuer = 'rPxU6acYni7FcXzPCMeaPSwKcuS2GTtNVN';
    } else if (issuerName === 'TokyoJPY') {
      issuer = 'r94s8px6kSw1uZ1MV98dhSRTvc6VMPoPcN';
    } else {
      if (issuerName.substr(0, 1) === 'r' && issuerName.length > 25 && issuerName.length < 36 ) {
        issuer = issuerName;
      }
    }
    return issuer;
  },

  xrpPrice(exchange_currency, exchange_issuer) {
    exchange_issuer = this.issuerAddress(exchange_issuer);
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
    issuer = this.issuerAddress(issuer);
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
