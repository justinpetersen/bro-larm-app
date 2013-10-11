$(function(){
  "use strict";

  BroLarm.View.XboxLoginView = Backbone.View.extend({

    el: $( '#content-container' ),

    template: _.template( $( '#gamer-login-template' ).html( ) ),

    events: {
      'keyup #gamertag': 'onGamertagKeyPress',
      'click #gamertag-submit': 'onGamertagSubmit'
    },

    laddaSubmit: null,

    onGamertagKeyPress: function( e ) {

      console.log( 'BroLarm.View.GamerLoginView.onGamertagEnter( )' );

      // Validate the form on any key press
      var valid = this.validateForm( );

      // If the enter key is pressed and the form is valid, then load the gamer profile
      if ( e.keyCode == 13 && valid ) {
        this.loadGamerProfile( $( '#gamertag' ).val( ) );
      }

    },

    onGamertagSubmit: function( e ) {

      console.log( 'BroLarm.View.GamerLoginView.onGamertagSubmit( )' );

      this.loadGamerProfile( $( '#gamertag' ).val( ) );

    },

    onSignOut: function( e ) {

      console.log( 'BroLarm.View.GamerLoginView.onSignOut( )' );

      this.signOut( );

    },

    onModelChanged: function( e ) {

      console.log( 'BroLarm.View.GamerLoginView.onModelChanged( )' );
      console.log( this.model.attributes );

      this.stopLoader( );
      this.checkShowGamerProfile( );
      this.clearFriends( );

    },

    onFriendAdded: function( model ) {

      console.log( 'BroLarm.View.GamerLoginView.onFriendAdded( )' );

      this.renderFriend( model );

    },

    initialize: function( ) {

      console.log( 'BroLarm.View.GamerLoginView.initialize( )' );

      // this.gamerProfileView = new GamerProfileMainView( { model: this.model } );
      // $( '#gamer-profile-container' ).html( this.gamerProfileView.render( ).el );

      // Set up events
      // this.listenTo( this.model, 'change', this.onModelChanged );
      // this.listenTo( this.model.friendsCollection, 'add', this.onFriendAdded );
      // this.listenTo( this.gamerProfileView, 'onSignOut', this.onSignOut );

      // Disable "Sign in" button until the user enters a gamertag
      // this.validateForm( );

      this.render( );

    },

    render: function( ) {

      console.log( 'BroLarm.View.GamerLoginView.render( )' );

      this.$el.html( this.template( this.model.toJSON( ) ) );

      this.laddaSubmit = Ladda.create( $( '#gamertag-submit' )[ 0 ] );

      return this;

    },

    checkShowGamerProfile: function( ) {

      console.log( 'BroLarm.View.GamerLoginView.renderGamerProfile( )' );

      if ( this.model.get( 'avatar' ) != '' ) {
      $( '#gamer-login-form' ).hide( );
        $( '#gamer-profile-container' ).fadeIn( );
      } else {
        $( '#gamer-profile-container' ).hide( );
        $( '#gamer-login-form' ).fadeIn( );
      }

    },

    renderFriend: function( model ) {

      $( '#friends-heading' ).fadeIn( 200 );
      $( '#friends-container' ).fadeIn( );
      var view = new GamerProfileItemView( { model: model } );
      $( '#friends-container' ).append( view.render().el );

    },

    clearFriends: function( ) {

      $( '#friends-heading' ).hide( );
      $( '#friends-container' ).empty( );

    },

    validateForm: function( ) {

      // Assume that the form entries are valid
      var valid = true;

      // Check that the form entries are valid and disable/enable the submit button
      if ( $( '#gamertag' ).val( ).length < 3 ) {
        valid = false;
        $( '#gamertag-submit' ).attr( 'disabled', 'disabled' );
      } else {
        $( '#gamertag-submit' ).removeAttr( 'disabled' );
      }

      return valid;

    },

    loadGamerProfile: function( gamertag ) {

      // Reset the gamer profile to its defaults
      this.model.set( this.model.defaults( ) );

      // Set the user's gamertag in the model
      this.model.set( 'gamertag', gamertag );

      // Fetch the user profile
      this.startLoader( );
      this.model.fetch( );

    },

    signOut: function( ) {

      $( '#gamertag' ).val( '' );
      $( '#form-signin' ).fadeIn( );
      $( '#gamer-profile-container' ).hide( );
      this.clearFriends( );

    },

    startLoader: function( ) {

      $( '#gamertag' ).attr( 'disabled', 'disabled' );
      this.laddaSubmit.start( );

    },

    stopLoader: function( ) {

      $( '#gamertag' ).removeAttr('disabled');
      this.laddaSubmit.stop( );

    }

  });

});
