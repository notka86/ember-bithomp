import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['social-icons'],
  routing: Ember.inject.service('-routing'),

  notIndex: Ember.computed(function() {
    return this.get('routing.currentRouteName')!=='index';
  })

});
