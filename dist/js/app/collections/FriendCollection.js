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
        this.reset( );
        this.fetch( );
      }

    },

    initialize: function( options ) {

      console.log( 'BroLarm.Collection.FriendCollection.initialize( )' );

    },
    
    setXboxUser: function( user ) {

      console.log( 'BroLarm.Collection.FriendCollection.setXboxUser( )' );
      
      if ( this.xboxUser ) {
        this.stopListening( this.xboxUser );
      }
      this.xboxUser = user;
      this.listenTo( this.xboxUser, 'change', $.proxy( this.onXboxUserChange, this ) );
      
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
