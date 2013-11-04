$(function(){

  brolarm.view.HomeView = Backbone.View.extend({
    
    el: $('#home-container'),
    
    template: _.template($('#home-template').html()),

    initialize: function() {
      this.render();
    },
    
    render: function() {
      this.$el.html(this.template(this.model.toJSON()));

      return this;
    }
  	
  });  

});