$(function(){

  brolarm.collection.BroLarmUserCollection =
      Backbone.Firebase.Collection.extend({

    model: brolarm.model.BroLarmUserModel,

    firebase: new Firebase(
        'https://cod-bro-larm.firebaseio.com/bro-larm-users'),

    url: '/bro-larm-users'

  });

});
