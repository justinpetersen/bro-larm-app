$(function(){

  BroLarm.Collection.UserCollection = Backbone.Firebase.Collection.extend({
    
  	url: '/users',
  	
  	model: BroLarm.Model.UserModel,
  	
  	firebase: new Firebase("https://cod-bro-larm.firebaseio.com/users"),

    initialize: function( ) {

      console.log( 'BroLarm.Collection.UserCollection.initialize( )' );

    }
  	
  });  

});