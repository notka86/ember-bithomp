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

    this.get('rippleData').countAccounts()
    .then(stat => {
      this.set('statDates', stat.dates);
      this.set('statCounts', stat.counts);
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
    let counts = this.get('statCounts');
    let dates = this.get('statDates');

    let respond = {
      labels: ['Date'],
      datasets: [
        {
          label: "Ripple activated Accounts",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [0],
          spanGaps: false,
        }
      ]
    };

    if (counts && dates) {
      respond.labels = dates;
      respond.datasets[0].data = counts;
    }

    return respond;
  }.property('statCounts'),

  actions: {

    updateInfo: function() {


    }
  }

});