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

    friendCollection: null,
    
    checkFirebaseReadyId: -1,

    onAuthorizeUser: function( error, user ) {

      console.log( 'BroLarm.Model.BroLarmUserManager.onAuthorizeUser( )' );

      if ( user ) {

        console.log( '  id: ' + user.id + ', username: ' + user.username );

        this.setFacebookUser( user );

      } else if ( error ) {

        console.log( '  error.code: ' + error.code );

      } else {

        // User is logged out
        this.resetUser( );

      }

    },
    
    onXboxUserChange: function( ) {
      
      if ( this.xboxUser.hasChanged( 'gamertag') ) {
        this.broLarmUser.set( 'gamertag', this.xboxUser.get( 'gamertag' ) );
      }
      
    },
    
    initialize: function( ) {

      console.log( 'BroLarm.Model.BroLarmUserManager.initialize( )' );

      this.firebase =  new Firebase( 'https://cod-bro-larm.firebaseio.com' );

      this.createDefaultUser( );
      this.createUserCollections( );
      
      this.pollFirebaseReady( );

    },

    createDefaultUser: function( ) {

      console.log( 'BroLarm.Model.BroLarmUserManager.createDefaultUser( )' );

      this.broLarmUser = new BroLarm.Model.BroLarmUserModel( );
      this.facebookUser = new BroLarm.Model.FacebookUserModel( );
      this.xboxUser = new BroLarm.Model.XboxUserModel( );
      
      this.listenTo( this.xboxUser, 'change', $.proxy( this.onXboxUserChange, this ) );
      
      // TODO: Figure out if this is necessary
      if ( this.friendCollection ) {
        this.friendCollection.setXboxUser( this.xboxUser );
      }

      // TODO: Figure out if this is the right place for this
      this.trigger( 'onResetUser' );

    },

    createUserCollections: function( ) {

      console.log( 'BroLarm.Model.BroLarmUserManager.createUserCollections( )' );

      this.broLarmUserCollection = new BroLarm.Collection.BroLarmUserCollection( );
      this.facebookUserCollection = new BroLarm.Collection.FacebookUserCollection( );
      this.xboxUserCollection = new BroLarm.Collection.XboxUserCollection( );
      this.friendCollection = new BroLarm.Collection.FriendCollection( );
      
      // Link this Bro-Larm user with his friends collection, so that selected friends can be saved
      this.friendCollection.setXboxUser( this.xboxUser );
      this.broLarmUser.setFriends( this.friendCollection );
      
    },
    
    pollFirebaseReady: function( ) {

      console.log( 'BroLarm.Model.BroLarmUserManager.pollFirebaseReady( )' );
      
      this.checkFirebaseReadyId = setInterval( $.proxy( this.checkFirebaseReady, this ), 1000 );
      
    },
    
    checkFirebaseReady: function( ) {

      console.log( 'BroLarm.Model.BroLarmUserManager.checkFirebaseReady( )' );
      
      if ( this.broLarmUserCollection.length > 0 ) {
        clearInterval( this.checkFirebaseReadyId );
        this.authorizeUser( );
      }
      
    },

    setFacebookUser: function( user ) {

      console.log( 'BroLarm.Model.BroLarmUserManager.setFacebookUser( )' );

      // Check if this Facebook user has a Bro-Larm account

      var lookedUpUser = this.broLarmUserCollection.get( user.id );
      if ( lookedUpUser ) {

        // If this is an existing user, then look up the user model

        this.broLarmUser = lookedUpUser;
        this.broLarmUser.setFriends( this.friendCollection );
        this.facebookUser = this.facebookUserCollection.get( this.broLarmUser.id );
        
        if ( this.broLarmUser.get( 'gamertag' ) != '' ) {
          this.xboxUser.set( 'gamertag', this.broLarmUser.get( 'gamertag' ) );
          this.xboxUser.fetch( );
        }

        this.trigger( 'onResetUser' );

      } else {

        // If this is a new user, then store his Facebook attributes

        this.broLarmUser.set( 'id', user.id );
        this.facebookUser.set( user );

        this.broLarmUserCollection.add( this.broLarmUser );
        this.facebookUserCollection.add( this.facebookUser );

      }
      
      this.trigger( 'onFacebookLogin' );

    },

    resetUser: function( ) {

      console.log( 'BroLarm.Model.BroLarmUserManager.resetUser( )' );

      this.createDefaultUser( );
      
      this.trigger( 'onFacebookLogout' );

    },

    authorizeUser: function( ) {

      console.log( 'BroLarm.Model.BroLarmUserManager.authorizeUser( )' );

      this.auth = new FirebaseSimpleLogin( this.firebase, $.proxy( this.onAuthorizeUser, this ) );

    },

    login: function( e ) {

      console.log( 'BroLarm.Model.BroLarmUserManager.login( )' );

      this.auth.login( 'facebook' );

    },

    logout: function( e ) {

      console.log( 'BroLarm.Model.BroLarmUserManager.logout( )' );

      this.auth.logout( );

    }

  });

});
