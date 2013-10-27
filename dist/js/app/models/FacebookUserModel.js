$(function(){
  "use strict";

  brolarm.model.FacebookUserModel = Backbone.Model.extend({

    idAttribute: 'id',

    defaults: function() {
      return {
        id: '',
        displayName: ''
      };
    }

  });

});
