$(function(){
  "use strict";

  BroLarm.Model.BroLarmUserManager = Backbone.Model.extend({

    firebase: null,

    broLarmUser: null,
    broLarmUserCollection: null,

    facebookUser: null,
    facebookUserCollection: null,

    xboxUser: null,
    xboxUserCollection: null,

    onAuthorizeUser: function( error, user ) {

      console.log( 'BroLarm.Model.BroLarmUserManager.onAuthorizeUser( )' );
      console.log( '  error: ' + error + ', user: ' + user );

      if ( user ) {

        console.log( '  id: ' + user.id + ', username: ' + user.username );

        this.setFacebookUser( user );

      } else if ( error ) {

        console.log( 'error.code: ' + error.code );

      } else {

        // User is logged out
        this.resetUser( );

      }

    },

    initialize: function( ) {

      console.log( 'BroLarm.Model.BroLarmUserManager.initialize( )' );

      this.firebase =  new Firebase( 'https://cod-bro-larm.firebaseio.com' );
      
      this.createUserCollections( );
      this.createDefaultUser( );

    },
    
    createUserCollections: function( ) {

      console.log( 'BroLarm.Model.BroLarmUserManager.createUserCollections( )' );
      
      this.broLarmUserCollection = new BroLarm.Collection.BroLarmUserCollection( );
      this.facebookUserCollection = new BroLarm.Collection.FacebookUserCollection( );
      this.xboxUserCollection = new BroLarm.Collection.XboxUserCollection( );
      
    },

    createDefaultUser: function( ) {

      console.log( 'BroLarm.Model.BroLarmUserManager.createDefaultUser( )' );

      this.broLarmUser = new BroLarm.Model.BroLarmUserModel( );
      this.facebookUser = new BroLarm.Model.FacebookUserModel( );
      this.xboxUser = new BroLarm.Model.XboxUserModel( );
      
      this.trigger( 'onResetUser' );

    },

    resetUser: function( ) {

      console.log( 'BroLarm.Model.BroLarmUserManager.resetUser( )' );

      this.createDefaultUser( );

    },

    setFacebookUser: function( user ) {

      console.log( 'BroLarm.Model.BroLarmUserManager.setFacebookUser( )' );

      // Check if this Facebook user has a Bro-Larm account

      var lookedUpUser = this.broLarmUserCollection.get( user.id );
      if ( lookedUpUser ) {

        // If this is an existing user, then look up the user model

        this.broLarmUser = lookedUpUser;
        this.facebookUser = this.facebookUserCollection.get( this.broLarmUser.id );
        
        this.trigger( 'onResetUser' );

      } else {
        
        // If this is a new user, then store his Facebook attributes

        this.broLarmUser.set( 'id', user.id );
        this.facebookUser.set( user );

        this.broLarmUserCollection.add( this.broLarmUser );
        this.facebookUserCollection.add( this.facebookUser );

      }

    },

    authorizeUser: function( ) {

      console.log( 'BroLarm.Model.BroLarmUserManager.authorizeUser( )' );

      this.auth = new FirebaseSimpleLogin( this.firebase, $.proxy( this.onAuthorizeUser, this ) );

      console.log( 'this.auth: ' + this.auth );

    },

    login: function( e ) {

      console.log( 'BroLarm.Model.BroLarmUserManager.login( )' );
      console.log( '  auth: ' + this.auth );

      this.auth.login( 'facebook' );

    },

    logout: function( e ) {

      console.log( 'BroLarm.Model.BroLarmUserManager.logout( )' );

      this.auth.logout( );

    }

  });

});
