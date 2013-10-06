$(function(){
  'use strict';

  BroLarm.Router = Backbone.Router.extend({
  
    routes: {
      'home': 'home'
    },

    initialize: function( controller ) {
      
      console.log( 'BroLarm.Router.initialize( )' );
      
      this.controller = controller;
      this.controller.router = this;
      this.controller.render( );
      
    },

    home: function( ) {
      
      console.log( 'BroLarm.Router.home( )' );
      
      this.setPage( 'home' );
      this.controller.trigger( 'home' );
      
    },

    setPage: function( page ) {
      
      console.log( 'BroLarm.Router.setPage( ' + page + ' )' );
      
      this.controller.currentPage = page;
      
    }
    
  });

});