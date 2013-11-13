$(function(){

  brolarm.view.NavView = Backbone.View.extend({

    showing: false,

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
      this.listenTo(this.model, 'change', $.proxy(this.render, this));
      this.render();
    },

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));

      if (this.model.get('avatar') == '' || this.model.get('id') == '') {
        this.hide();
      } else {
        this.show();
      }

      return this;
    },

    show: function() {
      $('#global-nav').animate({
          top: 0
      })

      this.showing = true;
    },

    hide: function() {
      $('#global-nav').animate({
          top: -80
      })

      this.showing = false;
    },

  });

});
