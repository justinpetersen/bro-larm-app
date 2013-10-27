$(function(){
  "use strict";

  brolarm.model.FriendModel = Backbone.Model.extend({

    initialize: function() {

      console.log( 'brolarm.model.FriendModel.initialize( )' );

    },

    defaults: function() {

      console.log( 'brolarm.model.FriendModel.defaults( )' );

      return {
        gamertag: '',
        avatar: '',
        presence: '',
        online: false,
        selected: false
      };

    },

    parse: function( response, options ) {

      console.log( 'brolarm.model.FriendModel.parse( )' );

      return {
        gamertag: response.gamertag,
        avatar: response.gamerpic.small,
        presence: response.status,
        online: response.online
      };

    }

  });

});
