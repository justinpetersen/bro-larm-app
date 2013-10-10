$(function(){
  "use strict";

  BroLarm.Model.XboxUserModel = Backbone.Model.extend({

    urlRoot: 'http://www.xboxleaders.com/api/2.0/profile.json',

    idAttribute: 'gamertag',

    initialize: function( ) {

      console.log( 'GamerProfileModel.initialize( )' );

      this.friendsCollection = new FriendsCollection( this );

    },

    url: function( ) {

      return this.urlRoot + '?gamertag=' + this.get( 'gamertag' );

    },

    defaults: function( ) {
      return {
        gamertag: '',
        avatar: '',
        presence: '',
        online: false
      };
    },

    parse: function( response, options ) {

      console.log( 'GamerProfileModel.parse( )' );

      this.friendsCollection.fetch( );

      return {
        gamertag: response.data.gamertag,
        avatar: response.data.avatar.tile,
        presence: response.data.presence,
        online: response.data.online
      };

    }

  });

});
