$(function(){

  BroLarm.Collection.BroLarmUserCollection = Backbone.Firebase.Collection.extend({

    model: BroLarm.Model.BroLarmUserModel,

    firebase: new Firebase( 'https://cod-bro-larm.firebaseio.com/bro-larm-users' ),

    url: '/bro-larm-users',

    initialize: function( ) {

      console.log( 'BroLarm.Collection.BroLarmUserCollection.initialize( )' );

    }

  });

});
