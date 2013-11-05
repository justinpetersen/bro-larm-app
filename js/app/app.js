$(function(){
  'use strict';

  /**
   * The main Bro-Larm class, responsible for the initializing the user manager
   * and managing the layout of the UI.
   * @constructor
   * @extends Backbone.View
   */
  brolarm.view.Controller = Backbone.View.extend({

    //-------------------------------------------------------------------------
    // PRIVATE PROPERTIES
    //-------------------------------------------------------------------------

    /* The user manager maintains the state of the Facebook user and the linked
     * Xbox LIVE user. All user state events come through the user manager.
     */
    models: {
      userManager: null
    },

    /* All child views are created at initialization, then just shown or hidden
     * as the application changes state.
     */
    views: {
      home: null,
      nav: null,
      xboxLogin: null,
      friends: null
    },

    // The current page is either "home" or "settings"
    currentPage: 'home',

    /* The DOM element that HTML would be inserted into on render. Since all
     * the UI is contained in the child views, this is never used.
     */
    el: $ ('#app'),

    //-------------------------------------------------------------------------
    // PRIVATE EVENT HANDLERS
    //-------------------------------------------------------------------------

    /**
     * Event handler for "Login" button clicks.
     */
    onLogin: function() {
      this.models.userManager.login();
    },

    /**
     * Event handler for "Logout" button clicks.
     */
    onLogout: function() {
      this.models.userManager.logout();
    },

    /**
     * Event handler for Facebook login.
     */
    onFacebookLogin: function() {
      this.setPage('settings');
    },

    /**
     * Event handler for Facebook logout.
     */
    onFacebookLogout: function() {
      this.setPage('home');
    },


    /**
     * Event handler for when the user is reset. This would be fired when the
     * default anonymous user is replaced with the logged in Facebook user, or
     * when the user logs out and is replaced with the default anonymous user.
     */
    onResetUser: function() {
      this.resetViews();
    },

    //-------------------------------------------------------------------------
    // PUBLIC METHODS
    //-------------------------------------------------------------------------

    /**
     * Shows or hides UI views depending on the current application state and
     * returns this view.
     * @return {brolarm.view.Controller} This view.
     */
    render: function() {
      switch (this.currentPage) {
        case 'home':
          $('#home-container').show();
          $('#xbox-container').hide();
          break;
        case 'settings':
          $('#home-container').hide();
          $('#xbox-container').show();
          break;
        default:
          break;
      }

      return this;
    },

    /**
     * Sets the state of the application and renders the view.
     * @param {string} page Mandatory value for which state to render. There
     *     are only two possible states: "home" and "settings."
     */
    setPage: function(page) {
      this.currentPage = page;
      this.render();
    },

    //-------------------------------------------------------------------------
    // private METHODS
    //-------------------------------------------------------------------------

     /**
      * Initializes models and views and renders the initial state of the
      * application.
      */
    initialize: function() {
      // Create models
      this.initUserManager();

      // Create views
      this.createNav();
      this.createHome();
      this.createXboxLogin();
      this.createFriends();

      // Render the application
      this.render();
    },

    /**
     * Initializes the user manager and listens for user manager state change
     * events.
     */
    initUserManager: function() {
      this.models.userManager = new brolarm.model.BroLarmUserManager();
      this.listenTo(
          this.models.userManager,
          'onFacebookLogin',
          $.proxy(this.onFacebookLogin, this)
     );
      this.listenTo(
          this.models.userManager,
          'onFacebookLogout',
          $.proxy(this.onFacebookLogout, this)
     );
      this.listenTo(
          this.models.userManager,
          'onResetUser',
          $.proxy(this.onResetUser, this)
     );
    },

    /**
     * Initializes the home page view.
     */
    createHome: function() {
      this.views.home = new brolarm.view.HomeView({
        model: this.models.userManager.facebookUser,
        router: this.router
      });
    },

    /**
     * Initializes the top navigation view.
     */
    createNav: function() {
      this.views.nav = new brolarm.view.NavView({
        model: this.models.userManager.facebookUser,
        router: this.router
      });

      this.listenTo(this.views.nav, 'onLogin', $.proxy(this.onLogin, this));
      this.listenTo(this.views.nav, 'onLogout', $.proxy(this.onLogout, this));
    },

    /**
     * Initializes the Xbox login form.
     */
    createXboxLogin: function() {
      this.views.xboxLogin = new brolarm.view.XboxLoginView({
        model: this.models.userManager.xboxUser,
        router: this.router
      });
    },

    /**
     * Initializes the Xbox friends list.
     */
    createFriends: function() {
      this.views.friends = new brolarm.view.FriendsView({
        model: this.models.userManager.xboxUser,
        collection: this.models.userManager.friendCollection,
        router: this.router
      });
    },

    /**
     * Re-initializes the top navigation and Xbox login form when the user
     * is reset to the default anonymous user. This is necessary to update
     * these views' local references to the Facebook and Xbox user models.
     */
    resetViews: function() {
      // If the nav exists, then initialize it with the new Facebook user
      if (this.views.nav) {
        this.views.nav.initialize({model: this.models.userManager.facebookUser});
      }

      // If the Xbox login exists, then initialize it with the new Xbox user
      if (this.views.xboxLogin) {
        this.views.xboxLogin.initialize({model: this.models.userManager.xboxUser});
      }

    }

  });

});
