$(function(){

  BroLarm.View.FriendItemView = Backbone.View.extend({

    template: _.template( $( '#friend-item-template' ).html( ) ),

    tagName: 'li',

    className: 'list-group-item',
    
    events: {
      "click .friend-select": "onFriendSelect",
    },
    
    onFriendSelect: function( ) {

      console.log( 'BroLarm.View.FriendItemView.onFriendSelect( )' );
      
      this.toggleFriendSelected( );
      
    },

    initialize: function( ) {

      console.log( 'BroLarm.View.FriendItemView.initialize( )' );

      this.listenTo( this.model, 'change', this.render );

    },

    render: function( ) {

      console.log( 'BroLarm.View.FriendItemView.render( )' );

      this.$el.html( this.template( this.model.toJSON( ) ) );

      return this;

    },
    
    toggleFriendSelected: function( ) {
      
      this.model.set( 'selected', !this.model.get( 'selected') );
      
    }

  });

});
