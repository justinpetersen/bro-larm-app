$(function(){

  brolarm.view.FriendItemView = Backbone.View.extend({

    template: _.template($('#friend-item-template').html()),

    tagName: 'li',

    className: 'list-group-item',
    
    events: {
      "click .friend-select": "onFriendSelect",
    },
    
    onFriendSelect: function() {
      this.toggleFriendSelected();
    },

    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
      this.render();
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    },
    
    toggleFriendSelected: function() {
      this.model.set('selected', !this.model.get('selected'));
    }

  });

});
