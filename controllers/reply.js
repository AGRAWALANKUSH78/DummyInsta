var Comment = require('../models/comment');
var Reply = require('../models/reply');

function replyController(req, res) {
	var newReply = new Reply();
	newReply.reply = req.body.ajaxReply;
	newReply.time = new Date();
	newReply.user = req.user._id;

	newReply.save(function (err, reply){
		if(err){
			console.log(err);
		} else {
			Comment.findById({ _id : req.params.comment_id })
			  .then((comment) => {
			  	comment.reply.push(reply._id);
			  	comment.save();
			  	res.json(reply);
			  })
			  .catch(error => console.log(error));
		}
	});
};

module.exports = { replyController }