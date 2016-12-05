import Ember from 'ember';
import config from '../config/environment';

export default Ember.Controller.extend({
  rippleData: Ember.inject.service(),
  ajax: Ember.inject.service(),

  onStart: function() {

    this.set('update', true);
    this.send('updateInfo');
    if (config.environment !== 'development') {
      this.infoUpdate();
    }

    this.get('rippleData').statistics()
    .then(stat => {
      this.set('statDate', stat.date);
      this.set('statAccountsCreatedAll', stat.accountsCreatedAll);
      this.set('statAccountsCreated', stat.accountsCreated);
      this.set('statPaymentsCount', stat.paymentsCount);
      this.set('statExchangesCount', stat.exchangesCount);
      this.set('statLedgerCount', stat.ledgerCount);
      this.set('statLedgerInerval', stat.ledgerInerval);
      this.set('statTxPerLedger', stat.txPerLedger);
    });

  },

  infoUpdate: function() {
    if (this.get('update')) {
      Ember.run.later(this, function() {
        this.send('updateInfo');
        this.infoUpdate();
      }, 60000);
    }
  },

  dataSet: function() {
    let accountsCreatedAll = this.get('statAccountsCreatedAll');
    let date = this.get('statDate');
    let accountsCreated = this.get('statAccountsCreated');
    let paymentsCount = this.get('statPaymentsCount');
    let exchangesCount = this.get('statExchangesCount');
    let txPerLedger = this.get('statTxPerLedger');
    let ledgerCount = this.get('statLedgerCount');
    //let ledgerInerval = this.get('statLedgerInerval');

    let respond = {
      labels: ['Date'],
      datasets: [
        {
          type: 'line',
          label: "Accounts created (All)",
          yAxisID: 'A',
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(255, 99, 132, 0.4)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: "rgba(255, 99, 132, 1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(255, 99, 132, 1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [0],
          spanGaps: false
        },
        {
          label: "Accounts created (weekly)",
          yAxisID: 'B',
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(54, 162, 235, 0.4)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: "rgba(54, 162, 235, 1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(54, 162, 235, 1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [0],
          spanGaps: false
        },
        {
          label: "Payments (weekly)",
          yAxisID: 'C',
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(255, 206, 86, 0.4)",
          borderColor: "rgba(255, 206, 86, 1)",
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: "rgba(255, 206, 86, 1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(255, 206, 86, 1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [0],
          spanGaps: false
        },
        {
          label: "Exchanges (weekly)",
          yAxisID: 'C',
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(75, 192, 192, 0.4)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: "rgba(75, 192, 192, 1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75, 192, 192, 1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [0],
          spanGaps: false
        },
        {
          label: "Ledgers closed (weekly)",
          yAxisID: 'D',
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(153, 102, 255, 0.4)",
          borderColor: "rgba(153, 102, 255, 1)",
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: "rgba(153, 102, 255, 1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(153, 102, 255, 1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [0],
          spanGaps: false
        },
        {
          label: "Transaction per ledger (weekly)",
          yAxisID: 'D',
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(255, 159, 64, 0.4)",
          borderColor: "rgba(255, 159, 64, 1)",
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: "rgba(255, 159, 64, 1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(255, 159, 64, 1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [0],
          spanGaps: false
        }
      ]
    };

    if (accountsCreatedAll && date && accountsCreated && paymentsCount && exchangesCount && ledgerCount && txPerLedger) {  //rewrite that
      respond.labels = date;
      respond.datasets[0].data = accountsCreatedAll;
      respond.datasets[1].data = accountsCreated;
      respond.datasets[2].data = paymentsCount;
      respond.datasets[3].data = exchangesCount;
      respond.datasets[4].data = ledgerCount;
      respond.datasets[5].data = txPerLedger;
    }

    return respond;
  }.property('statDate'),

  dataOptions: {
    scales: {
      yAxes: [
        {
          id: 'A',
          //type: 'linear',
          //position: 'left',
          display: false
        },
        {
          id: 'B',
          //type: 'linear',
          //position: 'right',
          display: false,
          ticks: {
            max: 10000,
            min: 0
          }
        }, 
        {
          id: 'C',
          //type: 'linear',
          //position: 'right',
          display: false,
          ticks: {
            max: 700000,
            min: 0
          }
        }, 
        {
          id: 'D',
          //type: 'linear',
          //position: 'right',
          display: false,
          //ticks: {
          //  max: 700000,
          //  min: 0
          //}
        }
      ]
    }
  },

  actions: {

    updateInfo: function() {


    }
  }

});
