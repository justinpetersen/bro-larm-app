$(function(){
  "use strict";

  BroLarm.Model.BroLarmUserModel = Backbone.Model.extend({

    idAttribute: 'id',

    defaults: function( ) {

      console.log( 'BroLarm.Model.BroLarmUserModel.defaults( )' );

      return {
        id: '',
        gamertag: ''
      };

    },

    initialize: function( ) {

      console.log( 'BroLarm.Model.BroLarmUserModel.initialize( )' );

    }

  });

});
