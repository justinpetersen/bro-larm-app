$(function(){

  brolarm.view.FriendsView = Backbone.View.extend({

    el: $('#friends-container'),

    template: _.template($('#friends-template').html()),
    
    friendCollection: null,
    
    onFriendAdded: function(model) {
      this.renderFriend(model);
    },

    onFriendsReset: function(eventName) {
      this.clearFriends();
    },

    initialize: function(options) {
      this.listenTo(this.collection, 'add', $.proxy(this.onFriendAdded, this));
      
      // TODO: Look at the best events to trigger clearing the friends list
      this.listenTo(this.collection, 'request', $.proxy(this.onFriendsReset, this));
      this.listenTo(this.collection, 'reset', $.proxy(this.onFriendsReset, this));
      
      this.render();
    },
    
    initSpinner: function() {
      $('#friends-spinner').waiting({ 
          className: 'waiting-circles', 
          elements: 8, 
          radius: 20, 
          auto: true 
      });
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      
      this.initSpinner();

      return this;
    },
    
    renderFriend: function(model) {
      $('#friends-spinner-container').hide();
      
      var view = new brolarm.view.FriendItemView({ model: model });
      $('#friend-list').append(view.render().el);
    },
    
    clearFriends: function() {
      $('#friend-list').empty();
    }

  });

});
