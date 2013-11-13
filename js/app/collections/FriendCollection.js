$(function(){
  "use strict";

  brolarm.collection.FriendCollection = Backbone.Collection.extend({

    model: brolarm.model.FriendModel,

    xboxUser: null,

    urlRoot: 'http://www.xboxleaders.com/api/2.0/friends.json',

    onXboxUserChange: function() {
      // KLUDGE: Only load friends once the avatar is populated. This is to
      // make sure that the gamer profile loads before loading friends.
      if (this.xboxUser.hasChanged('avatar')) {
        this.reset();

        if (this.xboxUser.get('gamertag') != '') {
          this.fetch();
        }
      }
    },

    setXboxUser: function(user) {
      if (this.xboxUser) {
        this.stopListening(this.xboxUser);
      }
      this.xboxUser = user;
      this.listenTo(
          this.xboxUser,
          'change',
          $.proxy(this.onXboxUserChange, this)
     );
    },

    parse: function(response, options) {
      return response.data.friends;
    },

    url: function() {
      return this.urlRoot + '?gamertag=' + this.xboxUser.get('gamertag');
    }

  });

});
