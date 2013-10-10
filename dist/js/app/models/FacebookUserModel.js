$(function(){
  "use strict";

  BroLarm.Model.FacebookUserModel = Backbone.Model.extend({

    idAttribute: 'id',

    defaults: function( ) {

      console.log( 'BroLarm.Model.FacebookUserModel.defaults( )' );

      return {
        id: '',
        displayName: ''
      };

    },

    initialize: function( ) {

      console.log( 'BroLarm.Model.FacebookUserModel.initialize( )' );

    }

  });

});
