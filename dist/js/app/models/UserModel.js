$(function(){
  "use strict";

  BroLarm.Model.UserModel = Backbone.Model.extend({
    
    defaults: function( ) {
      
      console.log( 'BroLarm.Model.UserModel.defaults( )' );
      
      return {
        displayName: '',
        id: '',
        gamertag: ''
      };
      
    },
  
    initialize: function( ) {
      
      console.log( 'BroLarm.Model.UserModel.initialize( )' );
      
    }

  });

});