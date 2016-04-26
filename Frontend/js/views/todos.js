var app = app || {};

app.TodoView = Backbone.View.extend({

	tagName: 'l1',

	template: _.template ($('#item-template').html() ),
	events: {
	  'click #edit-button': 'edit',
    'keypress .edit': 'updateOnEnter',
    'blur .edit': 'close',
    'click .toggle': 'togglecompleted',
    'click #destroy': 'clear'
	},

	initialize: function() {
		this.listenTo(this.model,'change', this.render);
		this.listenTo(this.model, 'destroy', this.remove);
	},

	render: function(){
		this.$el.html(this.template(this.model.attributes) );
		this.$input = this.$('.edit');
		this.$el.toggleClass( 'completed', this.model.get('completed') );
		return this;
	},

	edit: function() {
		this.$el.addClass('editing');
		this.$input.focus();
	},

	close: function() {
		var value = this.$input.val().trim();

		if (value) {
			this.model.save({name: value});
		}
		this.$el.removeClass('editing');
	},

	updateOnEnter: function( e ) {
		if (e.which === ENTER_KEY ) {
			this.close();
		}
	},

	togglecompleted: function() {
		this.model.toggle();
	},

	clear: function() {
  this.model.destroy();
}


});