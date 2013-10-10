$(function(){

  BroLarm.Collection.FacebookUserCollection = Backbone.Firebase.Collection.extend({

  	model: BroLarm.Model.FacebookUserModel,

  	firebase: new Firebase( 'https://cod-bro-larm.firebaseio.com/facebook-users' ),

    url: '/facebook-users',

    initialize: function( ) {

      console.log( 'BroLarm.Collection.FacebookUserCollection.initialize( )' );

    }

  });

});
