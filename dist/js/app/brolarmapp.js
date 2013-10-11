// Load the application once the DOM is ready, using `jQuery.ready`:
$(function(){

  var FriendModel = Backbone.Model.extend({

    defaults: function( ) {

      return {
        gamertag: '',
        avatar: '',
        presence: '',
        online: false,
        selected: false
      };

    },

    parse: function( response, options ) {

      console.log( 'FriendModel.parse( )' );

      return {
        gamertag: response.gamertag,
        avatar: response.gamerpic.large,
        presence: response.status,
        online: response.online
      };

    }

  });

  var FriendsCollection = Backbone.Collection.extend({

    model: FriendModel,

    gamerProfileModel: null,

    urlRoot: 'http://www.xboxleaders.com/api/2.0/friends.json',

    initialize: function( gamerProfileModel ) {

      console.log( 'FriendsCollection.initialize( )' );

      this.gamerProfileModel = gamerProfileModel;

    },

    parse: function( response, options ) {

      console.log( 'FriendsCollection.parse( )' );

      return response.data.friends;

    },

    url: function( ) {

      return this.urlRoot + '?gamertag=' + this.gamerProfileModel.get( 'gamertag' );

    }

  });

  var GamerProfileModel = Backbone.Model.extend({

    urlRoot: 'http://www.xboxleaders.com/api/2.0/profile.json',

    friendsCollection: null,

    initialize: function( ) {

      console.log( 'GamerProfileModel.initialize( )' );

      this.friendsCollection = new FriendsCollection( this );

    },

    url: function( ) {

      return this.urlRoot + '?gamertag=' + this.get( 'gamertag' );

    },

    defaults: function( ) {
      return {
        gamertag: '',
        avatar: '',
        presence: '',
        online: false
      };
    },

    parse: function( response, options ) {

      console.log( 'GamerProfileModel.parse( )' );

      this.friendsCollection.fetch( );

      return {
        gamertag: response.data.gamertag,
        avatar: response.data.avatar.tile,
        presence: response.data.presence,
        online: response.data.online
      };

    }

  });

  var GamerProfileMainView = Backbone.View.extend({

    template: _.template( $( '#gamer-profile-main-template' ).html( ) ),

    events: {
      'click #btn-sign-out': 'onSignOut'
    },

    onSignOut: function( ) {

      console.log( 'GamerProfileMainView.onSignOut( )' );

      this.trigger( 'onSignOut');

    },

    initialize: function( ) {

      console.log( 'GamerProfileMainView.initialize( )' );

      this.listenTo( this.model, 'change', this.render );

    },

    render: function( ) {

      console.log( 'GamerProfileMainView.render( )' );

      this.$el.html( this.template( this.model.toJSON( ) ) );

      return this;

    }

  });

  var GamerProfileItemView = Backbone.View.extend({

    template: _.template( $( '#gamer-profile-item-template' ).html( ) ),

    tagName: 'li',

    className: 'list-group-item',

    initialize: function( ) {

      console.log( 'GamerProfileItemView.initialize( )' );

      this.listenTo( this.model, 'change', this.render );

    },

    render: function( ) {

      console.log( 'GamerProfileItemView.render( )' );

      this.$el.html( this.template( this.model.toJSON( ) ) );

      return this;

    }

  });

  var BroLarmView = Backbone.View.extend({

    el: $( '#bro-larm-app' ),

    events: {
      'keyup #gamertag': 'onGamertagKeyPress',
      'click #form-submit': 'onGamertagSubmit'
    },

    onGamertagKeyPress: function( e ) {

      console.log( 'BroLarmView.onGamertagEnter( )' );

      // Validate the form on any key press
      var valid = this.validateForm( );

      // If the enter key is pressed and the form is valid, then load the gamer profile
      if ( e.keyCode == 13 && valid ) {
        this.loadGamerProfile( this.input.val( ) );
      }

    },

    onGamertagSubmit: function( e ) {

      console.log( 'BroLarmView.onGamertagSubmit( )' );

      this.loadGamerProfile( this.input.val( ) );

    },

    onSignOut: function( e ) {

      console.log( 'BroLarmView.onSignOut( )' );

      this.signOut( );

    },

    onModelChanged: function( e ) {

      console.log( 'BroLarmView.onModelChanged( )' );
      console.log( this.model.attributes );

      this.stopLoader( );
      this.checkShowGamerProfile( );
      this.clearFriends( );

    },

    onFriendAdded: function( model ) {

      console.log( 'BroLarmView.onFriendAdded( )' );

      this.renderFriend( model );

    },

    initialize: function( ) {

      console.log( 'BroLarmView.initialize( )' );

      this.input = $( '#gamertag' );
      this.laddaSubmit = Ladda.create( $( '#form-submit' )[ 0 ] );

      this.gamerProfileView = new GamerProfileMainView( { model: this.model } );
      $( '#gamer-profile-container' ).html( this.gamerProfileView.render( ).el );

      // Set up events
      this.listenTo( this.model, 'change', this.onModelChanged );
      this.listenTo( this.model.friendsCollection, 'add', this.onFriendAdded );
      this.listenTo( this.gamerProfileView, 'onSignOut', this.onSignOut );

      // Disable "Sign in" button until the user enters a gamertag
      this.validateForm( );

    },

    checkShowGamerProfile: function( ) {

      console.log( 'BroLarmView.renderGamerProfile( )' );

      if ( this.model.get( 'avatar' ) != '' ) {
      $( '#form-signin' ).hide( );
        $( '#gamer-profile-container' ).fadeIn( );
      } else {
        $( '#gamer-profile-container' ).hide( );
        $( '#form-signin' ).fadeIn( );
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
      if ( this.input.val( ).length < 3 ) {
        valid = false;
        $( '#form-submit' ).attr( 'disabled', 'disabled' );
      } else {
        $( '#form-submit' ).removeAttr( 'disabled' );
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

      this.input.val( '' );
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

  var gamerProfileModel = new GamerProfileModel( );
  var view = new BroLarmView( { model: gamerProfileModel } );

});
