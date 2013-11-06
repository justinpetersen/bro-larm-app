$(function(){
  "use strict";

  brolarm.model.BroLarmUserManager = Backbone.Model.extend({

    firebase: null,

    broLarmUser: null,
    broLarmUserCollection: null,

    facebookUser: null,
    facebookUserCollection: null,

    xboxUser: null,

    friendCollection: null,

    checkFirebaseReadyId: -1,

    onAuthorizeUser: function(error, user) {
      if (user) {
        this.setFacebookUser(user);
      } else if (error) {
        console.log('error.code: ' + error.code);
        // TODO: Handle errors authorizing Facebook user
      } else {
        // User is logged out
        this.resetUser();
      }
    },

    onXboxUserChange: function() {
      if (this.xboxUser.hasChanged('gamertag')) {
        this.broLarmUser.set('gamertag', this.xboxUser.get('gamertag'));
      }
    },

    initialize: function() {
      this.firebase =  new Firebase('https://cod-bro-larm.firebaseio.com');

      this.createDefaultUser();
      this.createUserCollections();

      this.pollFirebaseReady();
    },

    createDefaultUser: function() {
      this.broLarmUser = new brolarm.model.BroLarmUserModel();
      this.facebookUser = new brolarm.model.FacebookUserModel();
      this.xboxUser = new brolarm.model.XboxUserModel();

      this.listenTo(this.xboxUser, 'change', $.proxy(this.onXboxUserChange, this));

      // TODO: Figure out if this is necessary
      if (this.friendCollection) {
        this.friendCollection.setXboxUser(this.xboxUser);
      }

      // TODO: Figure out if this is the right place for this
      this.trigger('onResetUser');
    },

    createUserCollections: function() {
      this.broLarmUserCollection = new brolarm.collection.BroLarmUserCollection();
      this.facebookUserCollection = new brolarm.collection.FacebookUserCollection();
      this.friendCollection = new brolarm.collection.FriendCollection();

      // Link this Bro-Larm user with his friends collection, so that selected friends can be saved
      this.friendCollection.setXboxUser(this.xboxUser);
      this.broLarmUser.setFriends(this.friendCollection);

    },

    pollFirebaseReady: function() {
      this.checkFirebaseReadyId = setInterval($.proxy(this.checkFirebaseReady, this), 1000);
    },

    checkFirebaseReady: function() {
      if (this.broLarmUserCollection.length > 0) {
        clearInterval(this.checkFirebaseReadyId);
        this.authorizeUser();
      }
    },

    setFacebookUser: function(user) {
      // Check if this Facebook user has a Bro-Larm account
      var lookedUpUser = this.broLarmUserCollection.get(user.id);
      if (lookedUpUser) {

        // If this is an existing user, then look up the user model
        this.broLarmUser = lookedUpUser;
        this.broLarmUser.setFriends(this.friendCollection);
        this.facebookUser = this.facebookUserCollection.get(this.broLarmUser.id);

        // If this existing user has entered an Xbox gamertag, then look up
        // that Xbox user.
        if (this.broLarmUser.get('gamertag') != '') {
          this.xboxUser.set('gamertag', this.broLarmUser.get('gamertag'));
          this.xboxUser.fetch();
        }

        this.trigger('onResetUser');
      } else {
        // If this is a new user, then store his Facebook attributes.
        this.broLarmUser.set('id', user.id);
        this.facebookUser.set(user);

        // Add the new user to the Collections to save him to Firebase.
        this.broLarmUserCollection.add(this.broLarmUser);
        this.facebookUserCollection.add(this.facebookUser);
      }

      this.trigger('onFacebookLogin');
    },

    resetUser: function() {
      this.createDefaultUser();

      this.trigger('onFacebookLogout');
    },

    authorizeUser: function() {
      this.auth = new FirebaseSimpleLogin(
          this.firebase,
          $.proxy(this.onAuthorizeUser, this)
     );
    },

    login: function(e) {
      this.auth.login('facebook');
    },

    logout: function(e) {
      this.auth.logout();
    }

  });

});
