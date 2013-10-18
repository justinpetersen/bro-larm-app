$(function(){
  "use strict";

  BroLarm.View.XboxLoginView = Backbone.View.extend({

    el: $( '#xbox-login-container' ),

    template: _.template( $( '#xbox-login-template' ).html( ) ),

    events: {
      'keyup #gamertag': 'onGamertagKeyPress',
      'click #gamertag-submit': 'onGamertagSubmit',
      'click #btn-sign-out': 'onSignOut'
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

    onModelRequest: function( e ) {

      console.log( 'BroLarm.View.GamerLoginView.onModelRequest( )' );

      this.render( );

    },

    onModelChanged: function( e ) {

      console.log( 'BroLarm.View.GamerLoginView.onModelChanged( )' );

      this.render( );

    },

    initialize: function( options ) {

      console.log( 'BroLarm.View.GamerLoginView.initialize( )' );

      // If the model is being updated, then clean up and replace the old model with the new model
      if ( options.model ) {
        this.stopListening( this.model );
        this.model = options.model;
      }

      this.listenTo( this.model, 'change', this.onModelChanged );
      this.listenTo( this.model, 'request', this.onModelRequest );

      this.render( );

    },

    render: function( ) {

      console.log( 'BroLarm.View.GamerLoginView.render( )' );

      this.$el.html( this.template( this.model.toJSON( ) ) );

      this.laddaSubmit = Ladda.create( $( '#gamertag-submit' )[ 0 ] );
      this.stopLoader( );
      this.initSpinner( );
      
      this.checkShowGamerProfile( );

      return this;

    },
    
    initSpinner: function( ) {

      console.log( '*BroLarm.View.GamerLoginView.initSpinner( )' );
      
      $( '#xbox-spinner' ).waiting({ 
          className: 'waiting-circles', 
          elements: 8, 
          radius: 20, 
          auto: true 
      });
      
    },

    checkShowGamerProfile: function( ) {

      console.log( '*BroLarm.View.GamerLoginView.renderGamerProfile( )' );
      
      // Logged in to Xbox
      if ( this.model.get( 'avatar' ) != '' ) {
        $( '#xbox-login-form' ).hide( );
        $( '#xbox-profile' ).fadeIn( );
        $( '#xbox-spinner-container' ).hide( );
      // Logging in to Xbox
      } else if ( this.model.get( 'gamertag' ) != '' ) {
        $( '#xbox-profile' ).hide( );
        $( '#xbox-login-form' ).hide( );
        $( '#xbox-spinner-container' ).show( );
      // Need to log in to Xbox
      } else {
        $( '#xbox-profile' ).hide( );
        $( '#xbox-login-form' ).fadeIn( );
        $( '#xbox-spinner-container' ).hide( );
      }

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
      
      this.model.set( this.model.defaults( ) );

      $( '#gamertag' ).val( '' );
      $( '#xbox-login-form' ).fadeIn( );
      $( '#xbox-profile' ).hide( );

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
