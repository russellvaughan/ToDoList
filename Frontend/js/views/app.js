var app = app || {};

app.AppView = Backbone.View.extend({

	el: '#todoapp',

	events: {
		'keypress #new-todo': 'createOnEnter',
		'click #toggle-all': 'toggleAllComplete',
	},

	initialize: function() {
		this.allCheckbox = this.$('#toggle-all')[0];
		this.$input = this.$('#new-todo');
		this.listenTo(app.Todos, 'add', this.addOne);
		app.Todos.fetch({});
	},

	addOne: function (todo) {
		var view = new app.TodoView({model: todo});
		$('#todo-list').append( view.render().el);
	},

	newAttributes: function() {
		return {
			name: this.$input.val().trim(),
			completed: false
		};
	},

	createOnEnter: function(event) {
		if (event.which !== ENTER_KEY || !this.$input.val().trim() ) {
			return;
		}

		app.Todos.create( this.newAttributes() );
		this.$input.val('');
	},

	toggleAllComplete: function() {
		var completed = this.allCheckbox.checked;
		app.Todos.each(function( todo ) {
			todo.save({
				'completed': true,
			});
		});
	},

	render: function() {
		var completed = app.Todos.completed().length;
		var remaining = app.Todos.remaining().length;

		this.allCheckbox.checked = !remaining;

	},

	filterOne : function (todo) {
		todo.trigger('visible');
	},

	filterAll : function () {
		app.Todos.each(this.filterOne, this);
	},


});