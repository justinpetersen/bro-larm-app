$(function(){

  BroLarm.View.NavView = Backbone.View.extend({

    el: $('#nav-container'),

    template: _.template( $( '#nav-template' ).html( ) ),

    events: {
      'click #fb-login-button': 'onLoginClick',
      'click #fb-logout-button': 'onLogoutClick'
    },

    onLoginClick: function( ) {

      console.log( 'BroLarm.View.NavView.onLoginClick( )' );

      this.trigger( 'onLogin' );

    },

    onLogoutClick: function( ) {

      console.log( 'BroLarm.View.NavView.onLogoutClick( )' );

      this.trigger( 'onLogout' );

    },

    initialize: function( ) {

      console.log( 'BroLarm.View.NavView.initialize( )' );

      this.listenTo( this.model, 'change', this.render );

      this.render( );

    },

    render: function( ) {

      console.log( 'BroLarm.View.NavView.render( )' );

      this.$el.html( this.template( this.model.toJSON( ) ) );

      if ( this.model.id == '' ) {
        $('#fb-login-button').show( );
        $('#fb-logout-button').hide( );
        $('#fb-profile-pic').hide( );
      } else {
        $('#fb-login-button').hide( );
        $('#fb-logout-button').show( );
        $('#fb-profile-pic').show( );
      }

      return this;

    }

  });

});
