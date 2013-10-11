$(function(){
  'use strict';

  BroLarm.View.Controller = Backbone.View.extend({

    userManager: null,

    collections: { },

    models: { },

    views: { },

    router: null,

    currentPage: 'home',

    el: $('#app'),

    onLogin: function( ) {

      this.models.userManager.login( );

    },

    onLogout: function( ) {

      this.models.userManager.logout( );

    },

    onResetUser: function( ) {

      console.log( 'BroLarm.View.Controller.onResetUser( )' );
      
      if ( this.views.nav ) {
        
        this.views.nav.initialize( { model: this.models.userManager.facebookUser } );
        
      }

    },

    initialize: function( ) {

      console.log( 'BroLarm.View.Controller.initialize( )' );

      this.models.userManager = new BroLarm.Model.BroLarmUserManager( );
      this.listenTo( this.models.userManager, 'onResetUser', $.proxy( this.onResetUser, this ) );
      this.models.userManager.authorizeUser( );

      this.createNav( );

    },

    render: function( ) {

      console.log( 'BroLarm.View.Controller.render( )' );

      /* switch ( this.currentPage ) {
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
      }*/

      return this;

    },

    createNav: function( ) {

      console.log( 'BroLarm.View.Controller.createNav( )' );
      console.log( 'this.userManager.facebookUser: ' + this.models.userManager.facebookUser );

      this.views.nav = new BroLarm.View.NavView({
        model: this.models.userManager.facebookUser,
        router: this.router
      });

      this.listenTo( this.views.nav, 'onLogin', $.proxy( this.onLogin, this ) );
      this.listenTo( this.views.nav, 'onLogout', $.proxy( this.onLogout, this ) );

    }

  });

});
