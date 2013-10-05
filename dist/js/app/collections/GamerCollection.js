$(function(){
  
  var GamerCollection = Backbone.Firebase.Collection.extend({

    // Reference to this collection's model.
    model: GamerModel,

    // Save all of the todo items in a Firebase.
    firebase: new Firebase("https://cod-bro-larm.firebaseio.com")
  
  });

})();