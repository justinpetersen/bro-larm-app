exports.getFriendsOnline = function(req, res) {
  var Firebase = require('firebase');
  var broLarmUser = new Firebase('https://cod-bro-larm.firebaseio.com/bro-larm-users/' + req.params.id);

  broLarmUser.on('value', function(obj) {
      console.log('gamertag: ' + obj.val().gamertag);
      console.log('selectedFriends: ' + obj.val().selectedFriends);
  });

  /*$ = require('jquery');
  $.getJSON('ajax/test.json', function( data ) {
      var items = [];
      $.each( data, function( key, val ) {
        items.push( "<li id='" + key + "'>" + val + "</li>" );
  });

  $( "<ul/>", {
  "class": "my-new-list",
  html: items.join( "" )
  }).appendTo( "body" );
  });*/

  res.json(500, {'status': req.params.id});
};
