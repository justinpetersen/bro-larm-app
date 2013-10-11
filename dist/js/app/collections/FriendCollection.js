$(function(){
  "use strict";

  BroLarm.Collection.FriendCollection = Backbone.Collection.extend({

    model: BroLarm.Model.FriendModel,

    xboxUser: null,

    urlRoot: 'http://www.xboxleaders.com/api/2.0/friends.json',

    onXboxUserChange: function( ) {

      console.log( 'BroLarm.Collection.FriendCollection.onXboxUserChange( )' );

      // If the user's gamertag changes, then fetch their Xbox friends
      if ( this.xboxUser.hasChanged( 'gamertag') ) {
        this.fetch( );
      }

    },

    initialize: function( options ) {

      console.log( 'BroLarm.Collection.FriendCollection.initialize( )' );
      console.log( '  options.xboxUser: ' + options.xboxUser );

      // If the model is being updated, then clean up and replace the old model with the new model
      if ( options.xboxUser ) {
        this.stopListening( this.xboxUser );
        this.xboxUser = options.xboxUser;
        this.listenTo( this.xboxUser, 'change', $.proxy( this.onXboxUserChange, this ) );
      }

    },

    parse: function( response, options ) {

      console.log( 'BroLarm.Collection.FriendCollection.parse( )' );

      return response.data.friends;

    },

    url: function( ) {

      return this.urlRoot + '?gamertag=' + this.xboxUser.get( 'gamertag' );

    }

  });

});
