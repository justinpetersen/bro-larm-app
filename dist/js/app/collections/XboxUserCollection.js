$(function(){

  BroLarm.Collection.XboxUserCollection = Backbone.Firebase.Collection.extend({

    model: BroLarm.Model.XboxUserModel,

    firebase: new Firebase( 'https://cod-bro-larm.firebaseio.com/xbox-users' ),

    url: '/xbox-users',

    initialize: function( ) {

      console.log( 'BroLarm.Collection.XboxUserCollection.initialize( )' );

    }

  });

});
