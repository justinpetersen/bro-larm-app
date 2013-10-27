$(function(){
  "use strict";

  brolarm.model.XboxUserModel = Backbone.Model.extend({

    urlRoot: 'http://www.xboxleaders.com/api/2.0/profile.json',

    idAttribute: 'gamertag',

    url: function() {
      return this.urlRoot + '?gamertag=' + this.get('gamertag');
    },

    defaults: function() {
      return {
        gamertag: '',
        avatar: '',
        presence: '',
        online: false
      };
    },

    parse: function(response, options) {
      return {
        gamertag: response.data.gamertag,
        avatar: response.data.avatar.tile,
        presence: response.data.presence,
        online: response.data.online
      };
    }

  });

});
