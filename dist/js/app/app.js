$(function(){
  'use strict';

  BroLarm.View.Controller = Backbone.View.extend({

    userManager: null,

    models: { },
    collections: { },
    views: { },

    router: null,

    currentPage: 'home',

    el: $ ('#app' ),

    onLogin: function( ) {

      console.log( 'BroLarm.View.Controller.onLogin( )' );

      this.models.userManager.login( );

    },

    onLogout: function( ) {

      console.log( 'BroLarm.View.Controller.onLogout( )' );

      this.models.userManager.logout( );

    },

    onFacebookLogin: function( ) {

      this.setPage( 'settings' );

    },

    onFacebookLogout: function( ) {

      this.setPage( 'home' );

    },

    onResetUser: function( ) {

      console.log( 'BroLarm.View.Controller.onResetUser( )' );

      this.resetViews( );

    },

    initialize: function( ) {

      console.log( 'BroLarm.View.Controller.initialize( )' );

      this.models.userManager = new BroLarm.Model.BroLarmUserManager( );
      this.listenTo( this.models.userManager, 'onFacebookLogin', $.proxy( this.onFacebookLogin, this ) );
      this.listenTo( this.models.userManager, 'onFacebookLogout', $.proxy( this.onFacebookLogout, this ) );
      this.listenTo( this.models.userManager, 'onResetUser', $.proxy( this.onResetUser, this ) );

      this.createNav( );
      this.createHome( );
      this.createXboxLogin( );
      this.createFriends( );
      
      this.render( );

    },
    
    setPage: function( page ) {

      console.log( 'BroLarm.View.Controller.setPage( ' + page + ' )' );
      
      this.currentPage = page;
      this.render( );
      
    },

    render: function( ) {

      console.log( 'BroLarm.View.Controller.render( )' );

      switch ( this.currentPage ) {
        case 'home':
          $( '#home-container' ).show( );
          $( '#xbox-container' ).hide( );
          break;
        case 'settings':
          $( '#home-container' ).hide( );
          $( '#xbox-container' ).show( );
          break;
        default:
          break;
      }

      return this;

    },
    
    createHome: function( ) {
      
      this.views.home = new BroLarm.View.HomeView({
        model: this.models.userManager.facebookUser,
        router: this.router
      });
      
    },

    createNav: function( ) {

      console.log( 'BroLarm.View.Controller.createNav( )' );

      this.views.nav = new BroLarm.View.NavView({
        model: this.models.userManager.facebookUser,
        router: this.router
      });

      this.listenTo( this.views.nav, 'onLogin', $.proxy( this.onLogin, this ) );
      this.listenTo( this.views.nav, 'onLogout', $.proxy( this.onLogout, this ) );

    },

    createXboxLogin: function( ) {

      this.views.xboxLogin = new BroLarm.View.XboxLoginView({
        model: this.models.userManager.xboxUser,
        router: this.router
      });

    },
    
    createFriends: function( ) {
      
      this.views.friends = new BroLarm.View.FriendsView({
        model: this.models.userManager.xboxUser,
        collection: this.models.userManager.friendCollection,
        router: this.router
      });
      
    },

    resetViews: function( ) {

      console.log( 'BroLarm.View.Controller.resetViews( )' );

      // If the nav exists, then initialize it with the new Facebook user
      if ( this.views.nav ) {

        this.views.nav.initialize( { model: this.models.userManager.facebookUser } );

      }

      // If the Xbox login exists, then initialize it with the new Xbox user
      if ( this.views.xboxLogin ) {

        this.views.xboxLogin.initialize( { model: this.models.userManager.xboxUser } );

      }

    }

  });

});
