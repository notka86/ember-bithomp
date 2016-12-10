import DS from 'ember-data';

var Video = DS.Model.extend({
  title: DS.attr('string'),
  url: DS.attr('string'),

  youtubeId: function() {
    let url = this.get('url');
    let p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    let videoId = false;
    if (url && url.match(p)) {
      videoId = RegExp.$1;
    }
    return videoId;
  }.property('url'),

  youtubeImg: function() {
    let videoId = this.get('youtubeId');
    return ('https://img.youtube.com/vi/' + videoId + '/hqdefault.jpg').htmlSafe();
  }.property('youtubeId')

});

export default Video;
