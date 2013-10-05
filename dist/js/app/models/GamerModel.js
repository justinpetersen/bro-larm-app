$(function(){

  var GamerModel = Backbone.Model.extend({
  
    idAttribute: 'gamertag',

    defaults: function( ) {
    
      return {
        gamertag: ''
      };
    
    }

  });

})();