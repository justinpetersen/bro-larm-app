$(function(){

  brolarm.view.HomeView = Backbone.View.extend({
    
    el: $('#home-container'),
    
    template: _.template( $( '#home-template' ).html( ) ),

    initialize: function() {

      console.log( 'brolarm.view.HomeView.initialize( )' );
      
      this.render( );

    },
    
    render: function() {
      
      console.log( 'brolarm.view.HomeView.render( )' );

      this.$el.html( this.template( this.model.toJSON( ) ) );

      return this;
      
    }
  	
  });  

});