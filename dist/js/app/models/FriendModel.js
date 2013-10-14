$(function(){
  "use strict";

  BroLarm.Model.FriendModel = Backbone.Model.extend({

    initialize: function( ) {

      console.log( 'BroLarm.Model.FriendModel.initialize( )' );

    },

    defaults: function( ) {

      console.log( 'BroLarm.Model.FriendModel.defaults( )' );

      return {
        gamertag: '',
        avatar: '',
        presence: '',
        online: false,
        selected: false
      };

    },

    parse: function( response, options ) {

      console.log( 'BroLarm.Model.FriendModel.parse( )' );

      return {
        gamertag: response.gamertag,
        avatar: response.gamerpic.large,
        presence: response.status,
        online: response.online
      };

    }

  });

});
