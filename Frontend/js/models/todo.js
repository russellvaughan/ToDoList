var app = app || {}; 

app.Todo = Backbone.Model.extend({

	defaults: {

		name: " ",
		completed: false

	},


	toggle: function(){
	this.save({
			completed: !this.get('completed')
		});
	}

});