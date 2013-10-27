$(function(){

  brolarm.collection.XboxUserCollection = Backbone.Firebase.Collection.extend({

    model: brolarm.model.XboxUserModel,

    firebase: new Firebase('https://cod-bro-larm.firebaseio.com/xbox-users'),

    url: '/xbox-users'

  });

});
