Content = new Meteor.Collection('content');

if(Meteor.isServer) {
	var content = Content.findOne();
	if(content == null)
	   content = Content.insert({note: 'Type some multiline content here.'})
}

if (Meteor.isClient) {
  Template.contenteditable.content = function () {
	return Content.findOne();
  };

  Template.contenteditable.events({
    'blur .cr-note p': function () {
	var note_html = $('.cr-note p').html();
	Content.update({_id: Content.findOne()._id}, {$set: {note: note_html}});
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
