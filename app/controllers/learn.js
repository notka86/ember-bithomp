import Ember from 'ember';

export default Ember.Controller.extend({
  modal: Ember.inject.service(),

  videoLink: '',

  actions: {
    openVideo: function(videoId) {
      if (window.innerWidth < 970) {
        window.location.href = 'https://www.youtube.com/watch?v=' + videoId;
        return;
      }
      let link = ('https://www.youtube.com/embed/' + videoId + '?autoplay=1&fs=0').htmlSafe();
      this.set('videoLink', link);
      this.get('modal').open('popup-video');
    },

    stopVideo: function() {
      Ember.run.later(this, function() {
        this.set('videoLink', '');
      }, 600);
    }
  }
});
