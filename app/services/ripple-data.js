import Ember from 'ember';
import moment from 'moment';
var dataApi = 'https://data.ripple.com/v2/';

export default Ember.Service.extend({
  ajax: Ember.inject.service(),
  
  //should be replaced with real api call to backend
  issuerName: function(issuer) {
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

  xrpPrice: function(exchange_currency, exchange_issuer) {
    let reqUrl = dataApi + 'normalize?amount=1&exchange_currency=' + exchange_currency + '&exchange_issuer=' + exchange_issuer;
    return this.get('ajax').request(reqUrl)
    .then((data) => {
      if (data.result) {
        if (data.result !== 'success') {
          if (data.message) {
            console.log('xrp-price ticker: ' + data.message);
          } else {
            console.log('xrp-price ticker: ' + data.result);
          }
          return false;
        } else {
          return data.converted;
        }
      } else {
        console.log('xrp-price ticker: can not fetch data');
        return false;
      }
    }, () => {
      console.log('xrp-price ticker: server error');
      return false;
    });
  },

  exchangePrice: function(amount, currency, issuer, exchange_currency, exchange_issuer) {
    exchange_issuer = this.issuerAddress(exchange_issuer);
    let reqUrl = dataApi + 'normalize?amount=' + amount + '&currency=' + currency + '&issuer=' + issuer + '&exchange_currency=' + exchange_currency + '&exchange_issuer=' + exchange_issuer;
    this.get('ajax').request(reqUrl)
    .then((data) => {
      if (data.result) {
        if (data.result !== 'success') {
          if (data.message) {
            console.log('xrp-price ticker: ' + data.message);
          } else {
            console.log('xrp-price ticker: ' + data.result);
          }
          return false;
        } else {
          return {
            amount: data.amount,
            converted: data.converted,
            rate: data.rate
          };
        }
      } else {
        console.log('xrp-price ticker: can not fetch data');
        return false;
      }
    }, () => {
      console.log('xrp-price ticker: server error');
      return false;
    });
  },

  /*
  {"result":"error","message":"invalid amount"}
  {"result":"success","amount":"2000","converted":"12.400599364323527","rate":"0.0062002997"}
  {"result":"error","message":"issuer is required"}
  {"result":"success","amount":"2000","converted":"0","rate":"0.0000000"}
  */  

  activatedAccounts: function() {
    let reqUrl = dataApi + 'accounts/?reduce=true';
    return this.get('ajax').request(reqUrl)
    .then((data) => {
      if (data.result) {
        if (data.result !== 'success') {
          if (data.message) {
            console.log('activatedAccounts: ' + data.message);
          } else {
            console.log('activatedAccounts: ' + data.result);
          }
          return false;
        } else {
          return data.count;
        }
      } else {
        console.log('activatedAccounts: can not fetch data');
        return false;
      }
    }, () => {
      console.log('activatedAccounts: server error');
      return false;
    });
  },

  // need to be implemented in the backend! and return as endpoint
  bistampUSDprice: function(date) {
    let reqUrl = dataApi + 'exchange_rates/USD+rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B/XRP?date=' + date;
    return this.get('ajax').request(reqUrl)
    .then((data) => {
      if (data.result) {
        if (data.result !== 'success') {
          if (data.message) {
            console.log('bistampUSDprice: ' + data.message);
          } else {
            console.log('bistampUSDprice: ' + data.result);
          }
          return false;
        } else {
          return data.rate;
        }
      } else {
        console.log('bistampUSDprice: can not fetch data');
        return false;
      }
    }, () => {
      console.log('bistampUSDprice: server error');
      return false;
    });
  },

  // need to be implemented in the backend! and return as endpoint
  statistics: function() {
    let reqUrl = dataApi + 'stats/?interval=week&family=metric&metrics=accounts_created,payments_count,exchanges_count,tx_per_ledger,ledger_count,ledger_interval&limit=1000';

    return this.get('ajax').request(reqUrl)
    .then((data) => {
      if (data.result) {
        if (data.result !== 'success') {
          if (data.message) {
            console.log('statistics: ' + data.message);
          } else {
            console.log('statistics: ' + data.result);
          }
          return false;
        } else {
          let obj = data.stats;
          let respond = {
            date: [],
            niceDate: [],
            accountsCreatedAll: [],
            accountsCreated: [],
            paymentsCount: [],
            exchangesCount: [],
            txPerLedger: [],
            ledgerCount: [],
            //ledgerInerval: []
          };

          for (var i = 0, len = obj.length; i < len; i++){
            respond.date[i] = obj[i]["date"];
            respond.niceDate[i] = moment(obj[i]["date"]).format('LL');
            respond.accountsCreated[i] = obj[i]["accounts_created"];
            respond.paymentsCount[i] = obj[i]["payments_count"];
            respond.exchangesCount[i] = obj[i]["exchanges_count"];
            respond.txPerLedger[i] = obj[i]["tx_per_ledger"];
            respond.ledgerCount[i] = obj[i]["ledger_count"];
            //respond.ledgerInterval[i] = obj[i]["ledger_interval"];
            if (i > 0){
              respond.accountsCreatedAll[i] = obj[i]["accounts_created"] + respond.accountsCreatedAll[i-1];
            } else{
              respond.accountsCreatedAll[i] = obj[i]["accounts_created"];
            }
          }

          return respond;

          // "stats":[{"accounts_created":46,"ledger_count":28313,"ledger_interval":21.361212164023595,"payments_count":127,"tx_per_ledger":1.0030487804878048,"date":"2013-01-07T00:00:00Z"},
        }
      } else {
        console.log('statistics: can not fetch data');
        return false;
      }
    }, () => {
      console.log('statistics: server error');
      return false;
    });
  },

  nodes: function() {
    let reqUrl = dataApi + 'network/topology/nodes';
    return this.get('ajax').request(reqUrl)
    .then((data) => {
      if (data.result) {
        if (data.result !== 'success') {
          if (data.message) {
            console.log('nodes: ' + data.message);
          } else {
            console.log('nodes: ' + data.result);
          }
          return false;
        } else {
          return data.count;
        }
      } else {
        console.log('nodes: can not fetch data');
        return false;
      }
    }, () => {
      console.log('nodes: server error');
      return false;
    });
  },

  validators: function() {
    let reqUrl = dataApi + 'network/validators';
    return this.get('ajax').request(reqUrl)
    .then((data) => {
      if (data.result) {
        if (data.result !== 'success') {
          if (data.message) {
            console.log('validators: ' + data.message);
          } else {
            console.log('validators: ' + data.result);
          }
          return false;
        } else {
          return data.count;
        }
      } else {
        console.log('validators: can not fetch data');
        return false;
      }
    }, () => {
      console.log('validators: server error');
      return false;
    });
  },

  destribution: function() {
    let reqUrl = dataApi + 'network/xrp_distribution';
    return this.get('ajax').request(reqUrl)
    .then((data) => {
      if (data.result) {
        if (data.result !== 'success') {
          if (data.message) {
            console.log('destribution: ' + data.message);
          } else {
            console.log('destribution: ' + data.result);
          }
          return false;
        } else {
          let totalRows = data.rows.length;
          let lastRow = data.rows[totalRows-1];
          let prevDistribution = data.rows[totalRows-2].date;
          let lastDistributed = lastRow.distributed - data.rows[totalRows-2].distributed;
          return {
            lastDistribution: lastRow.date,
            prevDistribution: prevDistribution,
            distributed: lastRow.distributed,
            total: lastRow.total,
            undistributed: lastRow.undistributed,
            lastDistributed: lastDistributed
          };
        }
      } else {
        console.log('destribution: can not fetch data');
        return false;
      }
    }, () => {
      console.log('destribution: server error');
      return false;
    });
  },

});
