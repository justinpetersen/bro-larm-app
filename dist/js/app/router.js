$(function(){
  'use strict';

  BroLarm.Router = Backbone.Router.extend({
  
    routes: {
      'home': 'home',
      'settings': 'settings'
    },

    initialize: function( controller ) {
      
      console.log( 'BroLarm.Router.initialize( )' );
      
      this.controller = controller;
      this.controller.router = this;
      this.controller.render( );
      
    },

    home: function() {

      console.log( 'BroLarm.Router.home( )' );

    },

    settings: function() {

      console.log( 'BroLarm.Router.settings( )' );

    },

    setPage: function( page ) {
      
      console.log( 'BroLarm.Router.setPage( ' + page + ' )' );
      
      this.controller.currentPage = page;
      
    }
    
  });

});