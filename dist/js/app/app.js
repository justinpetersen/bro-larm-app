$(function(){
  'use strict';

  BroLarm.View.Controller = Backbone.View.extend({
		
    firebase: null,
    
    collections: { },
    
    models: { },
    
    router: null,
    
    currentPage: 'home',
    
    el: $('#app'),
    
    events: {
      'click #fb-login-button': 'login'
    },
    
    onAuthorizeUser: function( error, user ) {
      
      console.log( 'BroLarm.Views.Controller.onAuthorizeUser( )' );
      
      if ( user ) {
        
        console.log( 'id: ' + user.id + ', username: ' + user.username );
        
        this.models.userModel.set( user );
        this.collections.userCollection.add( this.models.userModel );
				
			} else if ( error ) {
			  
        // An error occurred while attempting login
        switch( error.code ) {
          case 'INVALID_EMAIL':
            break;
          case 'INVALID_PASSWORD':
            break;
          default:
        }
				
			} else {
			  
				// Logged out
				
			}
      
    },
    
    initialize: function( ) {
      
      console.log( 'BroLarm.Views.Controller.initialize( )' );
      
      this.firebase =  new Firebase('https://cod-bro-larm.firebaseio.com');
      
			this.models.userModel = new BroLarm.Model.UserModel( );
      
			this.collections.userCollection = new BroLarm.Collection.UserCollection( );
      
      this.authorizeUser( );
    
    },
    
		authorizeUser: function( ) {
      
      console.log( 'BroLarm.Views.Controller.authorizeUser( )' );
		  
			this.auth = new FirebaseSimpleLogin( this.firebase, $.proxy( this.onAuthorizeUser, this ) );
			
		},

		login: function( e ) {
      
      console.log( 'BroLarm.Views.Controller.authorizeUser( )' );
		  
      e.preventDefault();
			this.auth.login( 'facebook' );
			
		}

  });

});