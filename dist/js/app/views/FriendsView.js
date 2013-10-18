$(function(){

  BroLarm.View.FriendsView = Backbone.View.extend({

    el: $( '#friends-container' ),

    template: _.template( $( '#friends-template' ).html( ) ),
    
    friendCollection: null,
    
    onFriendAdded: function( model ) {

      console.log( 'BroLarm.View.FriendsView.onFriendAdded( )' );
      
      this.renderFriend( model );
      
    },

    onFriendsReset: function( eventName ) {

      console.log( 'BroLarm.View.FriendsView.onFriendsReset( )' );

      this.clearFriends( );

    },

    initialize: function( options ) {

      console.log( 'BroLarm.View.FriendsView.initialize( )' );
      
      this.listenTo( this.collection, 'add', $.proxy( this.onFriendAdded, this ) );
      this.listenTo( this.collection, 'request', $.proxy( this.onFriendsReset, this ) );
      this.listenTo( this.collection, 'reset', $.proxy( this.onFriendsReset, this ) );

      this.render( );

    },

    render: function( ) {

      console.log( 'BroLarm.View.FriendsView.render( )' );

      this.$el.html( this.template( this.model.toJSON( ) ) );

      return this;

    },
    
    renderFriend: function( model ) {

      console.log( 'BroLarm.View.FriendsView.renderFriend( )' );
      
      var view = new BroLarm.View.FriendItemView( { model: model } );
      $( '#friend-list' ).append( view.render().el );

    },
    
    clearFriends: function( ) {
      
      $( '#friend-list' ).empty( );
      
    }

  });

});