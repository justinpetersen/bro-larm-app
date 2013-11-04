$(function(){
  "use strict";

  brolarm.model.FriendModel = Backbone.Model.extend({

    defaults: function() {
      return {
        gamertag: '',
        avatar: '',
        presence: '',
        online: false,
        selected: false
      };
    },

    parse: function(response, options) {
      return {
        gamertag: response.gamertag,
        avatar: response.gamerpic.small,
        presence: response.status,
        online: response.online
      };
    }

  });

});
