$(function(){
  "use strict";

  brolarm.model.FacebookUserModel = Backbone.Model.extend({

    idAttribute: 'id',

    defaults: function() {

      console.log( 'brolarm.model.FacebookUserModel.defaults( )' );

      return {
        id: '',
        displayName: ''
      };

    },

    initialize: function() {

      console.log( 'brolarm.model.FacebookUserModel.initialize( )' );

    }

  });

});
