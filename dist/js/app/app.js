$(function(){
  'use strict';

  BroLarm.View.Controller = Backbone.View.extend({
		
    firebase: null,
    
    collections: { },
    
    models: { },
    
    views: { },
    
    router: null,
    
    currentPage: 'home',
    
    el: $('#app'),
    
    onAuthorizeUser: function( error, user ) {
      
      console.log( 'BroLarm.View.Controller.onAuthorizeUser( )' );
      
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
			  
        this.models.userModel.set( this.models.userModel.defaults( ) );
				
			}
      
    },
    
    initialize: function( ) {
      
      console.log( 'BroLarm.View.Controller.initialize( )' );
      
      this.firebase =  new Firebase( 'https://cod-bro-larm.firebaseio.com' );
			this.models.userModel = new BroLarm.Model.UserModel( );
			this.collections.userCollection = new BroLarm.Collection.UserCollection( );
			
			this.createNav( );
			
      this.authorizeUser( );
    
    },
    
    render: function( ) {
      
      console.log( 'BroLarm.View.Controller.render( )' );
      
      switch ( this.currentPage ) {
        case 'home':
          this.views.home = new BroLarm.View.HomeView({
            model: this.models.userModel,
            router: this.router
          });
          break;
        case 'settings':
          this.views.settings = new BroLarm.View.GamerLoginView({
            model: this.models.userModel,
            router: this.router
          });
          break;
        default:
          break;
      }
      
      return this;
      
    },
    
    createNav: function( ) {
      
      console.log( 'BroLarm.View.Controller.createNav( )' );
      
      this.views.nav = new BroLarm.View.NavView({
        model: this.models.userModel,
        router: this.router
      });
      
      this.listenTo( this.views.nav, 'onLogin', this.login );
      this.listenTo( this.views.nav, 'onLogout', this.logout );
      
    },
    
		authorizeUser: function( ) {
      
      console.log( 'BroLarm.Views.Controller.authorizeUser( )' );
		  
			this.auth = new FirebaseSimpleLogin( this.firebase, $.proxy( this.onAuthorizeUser, this ) );
			
		},

		login: function( e ) {
      
      console.log( 'BroLarm.Views.Controller.login( )' );
		  
			this.auth.login( 'facebook' );
			
		},
		
		logout: function( e ) {
      
      console.log( 'BroLarm.Views.Controller.logout( )' );
		  
		  this.auth.logout( );
		  
		}

  });

});