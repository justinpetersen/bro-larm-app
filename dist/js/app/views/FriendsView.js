$(function(){

  brolarm.view.FriendsView = Backbone.View.extend({

    el: $( '#friends-container' ),

    template: _.template( $( '#friends-template' ).html( ) ),
    
    friendCollection: null,
    
    onFriendAdded: function( model ) {

      console.log( 'brolarm.view.FriendsView.onFriendAdded( )' );
      
      this.renderFriend( model );
      
    },

    onFriendsReset: function( eventName ) {

      console.log( 'brolarm.view.FriendsView.onFriendsReset( )' );

      this.clearFriends( );

    },

    initialize: function( options ) {

      console.log( 'brolarm.view.FriendsView.initialize( )' );
      
      this.listenTo( this.collection, 'add', $.proxy( this.onFriendAdded, this ) );
      
      // TODO: Look at the best events to trigger clearing the friends list
      this.listenTo( this.collection, 'request', $.proxy( this.onFriendsReset, this ) );
      this.listenTo( this.collection, 'reset', $.proxy( this.onFriendsReset, this ) );

      this.render( );

    },

    render: function() {

      console.log( 'brolarm.view.FriendsView.render( )' );

      this.$el.html( this.template( this.model.toJSON( ) ) );

      return this;

    },
    
    renderFriend: function( model ) {

      console.log( 'brolarm.view.FriendsView.renderFriend( )' );
      
      var view = new brolarm.view.FriendItemView( { model: model } );
      $( '#friend-list' ).append( view.render().el );

    },
    
    clearFriends: function() {
      
      $( '#friend-list' ).empty( );
      
    }

  });

});
