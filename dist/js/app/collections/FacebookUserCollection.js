$(function(){

  brolarm.collection.FacebookUserCollection =
      Backbone.Firebase.Collection.extend({

  	model: brolarm.model.FacebookUserModel,

  	firebase: new Firebase(
  	    'https://cod-bro-larm.firebaseio.com/facebook-users'),

    url: '/facebook-users'

  });

});
