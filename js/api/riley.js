var ONLINE_STATUS = 'Online playing Call of Duty';

exports.getFriendsOnline = function(req, res) {
  var Firebase = require('firebase');
  var broLarmUser = new Firebase('https://cod-bro-larm.firebaseio.com/bro-larm-users/' + req.params.id);

  broLarmUser.on('value', function(data) {
      var gamertag = data.val().gamertag;
      var selectedFriends = data.val().selectedFriends;
      
      // Create a hash table of selected friends for easy lookup
      var selectedFriendsLookup = {};
      for (var i=0; i<selectedFriends.length; i++) {
        selectedFriendsLookup[selectedFriends[i]] = true;
      }

      $ = require('jquery');
      $.getJSON('https://www.xboxleaders.com/api/2.0/friends.json?gamertag=Major%20Nelson', function(data) {
        // Assume all this gamer's friends are offline.
        var online = false;
        
        // Check if there are any Xbox friends online playing Call of Duty
        for (var i=0; i<data.data.friends.length; i++) {
          if (selectedFriendsLookup[data.data.friends[i].gamertag]) {
            if (data.data.friends[i].status.indexOf(ONLINE_STATUS) != -1) {
              online = true;
            }
          }
        }

        // Return a status of "online" or "offline"
        var onlineStatus = online ? 'online' : 'offline';
        res.json(200, {'status': onlineStatus});
      });
  });
};
