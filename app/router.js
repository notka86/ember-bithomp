import Ember from 'ember';
import config from './config/environment';
import googlePageview from './mixins/google-pageview';

const Router = Ember.Router.extend(googlePageview, {
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('create');
  this.route('exchange');
  this.route('statistics');
  this.route('chart');
  this.route('learn');
});

export default Router;
