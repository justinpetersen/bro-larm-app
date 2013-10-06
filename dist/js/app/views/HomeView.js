$(function(){

  BroLarm.View.HomeView = Backbone.View.extend({
    
    el: $('#content-container'),
    
    template: _.template( $( '#home-template' ).html( ) ),

    initialize: function( ) {

      console.log( 'BroLarm.View.HomeView.initialize( )' );
      
      this.render( );

    },
    
    render: function( ) {
      
      console.log( 'BroLarm.View.HomeView.render( )' );

      this.$el.html( this.template( this.model.toJSON( ) ) );

      return this;
      
    }
  	
  });  

});