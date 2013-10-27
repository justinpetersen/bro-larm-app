$(function(){
  "use strict";

  brolarm.model.XboxUserModel = Backbone.Model.extend({

    urlRoot: 'http://www.xboxleaders.com/api/2.0/profile.json',

    idAttribute: 'gamertag',

    initialize: function() {

      console.log( 'brolarm.model.XboxUserModel.initialize( )' );

    },

    url: function() {

      return this.urlRoot + '?gamertag=' + this.get( 'gamertag' );

    },

    defaults: function() {

      console.log( 'brolarm.model.XboxUserModel.parse( )' );

      return {
        gamertag: '',
        avatar: '',
        presence: '',
        online: false
      };

    },

    parse: function( response, options ) {

      console.log( 'brolarm.model.XboxUserModel.parse( )' );

      return {
        gamertag: response.data.gamertag,
        avatar: response.data.avatar.tile,
        presence: response.data.presence,
        online: response.data.online
      };

    }

  });

});
