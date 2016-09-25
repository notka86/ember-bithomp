import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['main-box'],

  thisYear: function() {
    let d = new Date();
    return d.getFullYear();
  }.property()

});
