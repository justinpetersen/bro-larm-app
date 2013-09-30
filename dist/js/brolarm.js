// Load the application once the DOM is ready, using `jQuery.ready`:
$(function(){

  var FriendModel = Backbone.Model.extend({

    urlRoot: 'http://www.xboxleaders.com/api/2.0/profile.json',

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

  var GamerProfileView = Backbone.View.extend({

    template: _.template( $( '#gamer-profile-template' ).html( ) ),

    tagName: 'li',

    className: 'list-group-item',

    initialize: function( ) {

      console.log( 'GamerProfileView.initialize( )' );

      this.listenTo( this.model, 'change', this.render );

    },

    render: function( ) {

      console.log( 'GamerProfileView.render( )' );

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

    onModelChanged: function( e ) {

      console.log( 'BroLarmView.onModelChanged( )' );
      console.log( this.model.attributes );

      this.stopLoader( );
      this.renderGamerProfile( );
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
      this.listenTo( this.model, 'change', this.onModelChanged );
      this.listenTo( this.model.friendsCollection, 'add', this.onFriendAdded );

      this.validateForm( );

    },

    render: function( ) {

      console.log( 'BroLarmView.render( )' );
      // TODO: Fill this in
      return this;

    },

    renderGamerProfile: function( ) {

      console.log( 'BroLarmView.renderGamerProfile( )' );

      var view = new GamerProfileView( { model: this.model } );
      $( '#gamer-profile-container' ).html( view.render( ).el );

      if ( this.model.get( 'avatar' ) != '' ) {
        $( '#gamer-profile-container' ).show( );
      } else {
        $( '#gamer-profile-container' ).hide( );
      }

    },

    renderFriend: function( model ) {

      $( '#friends-heading' ).show( );
      var view = new GamerProfileView( { model: model } );
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
        $( '#form-submit' ).removeAttr('disabled');
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

    startLoader: function( ) {

      $( '#gamertag' ).attr( 'disabled', 'disabled' );
      this.laddaSubmit.start( );

    },

    stopLoader: function( ) {

      $( '#gamertag' ).removeAttr('disabled');
      this.laddaSubmit.stop( );

    }

  });

  // var App = new AppView( );

  var gamerProfileModel = new GamerProfileModel( );
  var view = new BroLarmView( { model: gamerProfileModel } );

});
