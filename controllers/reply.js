import { Comment as Comment } from '../models/comment';
import { Reply as Reply } from '../models/reply';

const replyController = (req, res) => {
	const newReply = new Reply();
	newReply.reply = req.body.ajaxReply;
	newReply.time = new Date();
	newReply.user = req.user._id;

	newReply.save((err, reply) => {
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

export { replyController };