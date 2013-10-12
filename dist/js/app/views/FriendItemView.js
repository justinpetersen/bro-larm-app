$(function(){

  BroLarm.View.FriendItemView = Backbone.View.extend({

    template: _.template( $( '#friend-item-template' ).html( ) ),

    tagName: 'li',

    className: 'list-group-item',

    initialize: function( ) {

      console.log( 'BroLarm.View.FriendItemView.initialize( )' );

      this.listenTo( this.model, 'change', this.render );

    },

    render: function( ) {

      console.log( 'BroLarm.View.FriendItemView.render( )' );

      this.$el.html( this.template( this.model.toJSON( ) ) );

      return this;

    }

  });

});
