$(function(){

  brolarm.view.NavView = Backbone.View.extend({

    el: $('#nav-container'),

    template: _.template($('#nav-template').html()),

    events: {
      'click #fb-login-button': 'onLoginClick',
      'click #fb-logout-button': 'onLogoutClick'
    },

    onLoginClick: function() {
      this.trigger('onLogin');
    },

    onLogoutClick: function() {
      this.trigger('onLogout');
    },

    initialize: function(options) {
      // If the model is being updated, then clean up and replace the old model with the new model
      if (options.model) {
        this.stopListening(this.model);
        this.model = options.model;
      }

      this.listenTo(this.model, 'change', $.proxy(this.render, this));

      this.render();
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));

      // If the user is logged in
      if (this.model.id == '') {
        $('#fb-login-button').show();
        $('#fb-logout-button').hide();
        $('#fb-profile-pic').hide();
      } else {
        $('#fb-login-button').hide();
        $('#fb-logout-button').show();
        $('#fb-profile-pic').show();
      }

      return this;
    }

  });

});