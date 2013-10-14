$(function(){
  "use strict";

  BroLarm.Model.BroLarmUserModel = Backbone.Model.extend({

    idAttribute: 'id',
    
    friends: null,
    
    onFriendSelectToggle: function( model ) {

      console.log( 'BroLarm.Model.BroLarmUserModel.onFriendSelectToggle( )' );
      
      this.setFriendSelected( model );
      
    },

    defaults: function( ) {

      console.log( 'BroLarm.Model.BroLarmUserModel.defaults( )' );

      return {
        id: '',
        gamertag: '',
        selectedFriends: [ ]
      };

    },

    initialize: function( ) {

      console.log( 'BroLarm.Model.BroLarmUserModel.initialize( )' );

    },

    setFriends: function( list ) {

      console.log( 'BroLarm.Model.FriendCollection.setFriends( )' );

      if ( this.friends ) {
        this.stopListening( this.friends );
      }
      this.friends = list;
      this.listenTo( this.friends, 'change', $.proxy( this.onFriendSelectToggle, this ) );

    },
    
    setFriendSelected: function( model ) {

      console.log( 'BroLarm.Model.BroLarmUserModel.setFriendSelected( )' );
      
      var oldSelected = this.get( 'selectedFriends' );
      var newSelected = [ ];
      
      // If there are existing friends, then copy all the existing friends to the new list
      if ( oldSelected ) {
        for ( var i = 0; i < oldSelected.length; i++ ) {
          if ( oldSelected[ i ] != model.get( 'gamertag' ) ) {
            newSelected.push( oldSelected[ i ] );
          }
        }
      }
      
      // If the toggled friend was selected, also copy him to the new list
      if ( model.get( 'selected' ) ) {
        newSelected.push( model.get( 'gamertag' ) );
      }
      
      // Save the new friend list
      this.set( 'selectedFriends', newSelected );
      
    }

  });

});
