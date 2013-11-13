$(function(){

  brolarm.view.NavView = Backbone.View.extend({

    el: $('#nav-container'),

    template: _.template($('#nav-template').html()),

    events: {
      'click #xbox-change-button': 'onChangeClick',
      'click #fb-logout-button': 'onLogoutClick'
    },

    onChangeClick: function() {
      this.trigger('onChangeGamertag');
    },

    onLogoutClick: function() {
      this.trigger('onLogout');
    },

    initialize: function(options) {
      // If the model is being updated, then clean up and replace the old model with the new model
      // if (options.model) {
      //   this.stopListening(this.model);
      //   this.model = options.model;
      // }

      this.listenTo(this.model, 'change', $.proxy(this.render, this));

      this.render();
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));

      return this;
    },

    show: function() {
      this.$el.show();
    },

    hide: function() {
      this.$el.hide();
    },

  });

});
