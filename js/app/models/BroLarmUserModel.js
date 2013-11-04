$(function(){
  "use strict";

  brolarm.model.BroLarmUserModel = Backbone.Model.extend({

    idAttribute: 'id',
    
    friends: null,
    
    onFriendSelectToggle: function(model) {
      this.setFriendSelected(model);
    },

    onFriendsSync: function() {
      this.updateFriendsSelected();
    },

    defaults: function() {
      return {
        id: '',
        gamertag: '',
        selectedFriends: []
      };
    },

    setFriends: function(list) {
      if (this.friends) {
        this.stopListening(this.friends);
      }
      this.friends = list;
      this.listenTo(
          this.friends,
          'change',
          $.proxy(this.onFriendSelectToggle, this)
     );
      this.listenTo(
          this.friends,
          'sync',
          $.proxy(this.onFriendsSync, this)
     );
      
      this.updateFriendsSelected();
    },
    
    updateFriendsSelected: function() {
      var selected = this.get('selectedFriends');
      var friend;
      if (selected) {
        for (var i = 0; i < selected.length; i++) {
          friend = this.friends.findWhere({gamertag: selected[i]});
          if (friend) {
            friend.set('selected', true);
          }
        }
      }
    },
    
    setFriendSelected: function(model) {
      var oldSelected = this.get('selectedFriends');
      var newSelected = [];
      
      // If there are existing friends, then copy all the existing friends to the new list
      if (oldSelected) {
        for (var i = 0; i < oldSelected.length; i++) {
          if (oldSelected[i] != model.get('gamertag')) {
            newSelected.push(oldSelected[ i ]);
          }
        }
      }
      
      // If the toggled friend was selected, also copy him to the new list
      if (model.get('selected')) {
        newSelected.push(model.get('gamertag'));
      }
      
      // Save the new friend list
      this.set('selectedFriends', newSelected);
    }

  });

});
