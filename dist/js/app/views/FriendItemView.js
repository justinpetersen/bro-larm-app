$(function(){

  brolarm.view.FriendItemView = Backbone.View.extend({

    template: _.template( $( '#friend-item-template' ).html( ) ),

    tagName: 'li',

    className: 'list-group-item',
    
    events: {
      "click .friend-select": "onFriendSelect",
    },
    
    onFriendSelect: function() {

      console.log( 'brolarm.view.FriendItemView.onFriendSelect( )' );
      
      this.toggleFriendSelected( );
      
    },

    initialize: function() {

      console.log( 'brolarm.view.FriendItemView.initialize( )' );

      this.listenTo( this.model, 'change', this.render );

    },

    render: function() {

      console.log( 'brolarm.view.FriendItemView.render( )' );

      this.$el.html( this.template( this.model.toJSON( ) ) );
      
      $( '#checkbox-id' ).attr( 'id', this.model.get( 'gamertag' ) );
      var checkboxLabel = $( '#checkbox-label-id' );
      checkboxLabel.attr( 'id', this.model.get( 'gamertag' ) );
      checkboxLabel.attr( 'for', this.model.get( 'gamertag' ) );

      return this;

    },
    
    toggleFriendSelected: function() {
      
      this.model.set( 'selected', !this.model.get( 'selected') );
      
    }

  });

});
