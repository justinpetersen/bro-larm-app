$(function(){
  "use strict";

  BroLarm.Collection.FriendCollection = Backbone.Collection.extend({

    model: FriendModel,

    xboxUser: null,

    urlRoot: 'http://www.xboxleaders.com/api/2.0/friends.json',

    initialize: function( options ) {

      console.log( 'BroLarm.Collection.FriendCollection.initialize( )' );

      this.xboxUser = options.xboxUser;

    },

    parse: function( response, options ) {

      console.log( 'BroLarm.Collection.FriendCollection.parse( )' );

      return response.data.friends;

    },

    url: function( ) {

      return this.urlRoot + '?gamertag=' + this.xboxUser.get( 'gamertag' );

    }

  });

})();
