var app = app || {};

var TodoList = Backbone.Collection.extend({

	url: 'http://localhost:3000/tasks',
	model: app.Todo,
});


app.Todos = new TodoList();