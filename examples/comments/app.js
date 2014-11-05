var Espresso = window.Espresso;
var Model = Espresso.Model, Collection = Espresso.Collection, Controller = Espresso.Controller, List = Espresso.List;
var extend = Espresso.extend;
var converter = new window.Showdown.converter();

var Comment = extend(Controller, {
	removeComment: function(e) {
		console.log('removing', this.model.id);
		comments.remove({ id: this.model.id });
	},
	html: function() {
		return converter.makeHtml(this.model.get('text'));
	},
	render: function() {
		return {
			author: { text: this.model.author },
			html: { html: this.html() },
			remove: { onclick: this.removeComment }
		};
	}
});

var CommentForm = extend(Controller, {
	save: function(e) {
		var comment = { author: this.ref.author.value, text: this.ref.text.value, id: comments.count() };
		comments.push(comment);
		e.target.reset();
		console.log('added', comment);
	},
	render: function() {
		return {
			view: { onsubmit: this.save }
		};
	}
});

var CommentBox = extend(Controller, {
	init: function() {
		this.commentForm = new CommentForm();
		this.list = new List(Comment, comments);
	},
	render: function() {
		return {
			commentForm: this.commentForm,
			commentList: this.list
		};
	}
});

var comments = new Collection([
  { id: 0, author: '@vla (Vlad Yazhbin)', text: 'This is one comment' },
  { id: 1, author: 'AngularJS', text: 'This is *another* comment' }
]);

window.app = new CommentBox({ view: document.querySelector('.commentBox') });