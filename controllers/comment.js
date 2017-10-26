var Comment = require('../models/comment');
var Post = require('../models/post');

function commentController(req, res) {
	var newComment = new Comment();
	newComment.comment= req.body.ajaxComment;
	newComment.time = new Date();
	newComment.user = req.user._id;
	newComment.reply = [];

	newComment.save(function(err, comment){
	  if(err) {
	    console.log(err);
	  } else {
	  	Post.findById({ _id : req.params.post_id })
	      .then((post) => {
	  	    post.comment.push(comment._id);	
	  	    post.save(); 
	  	    res.json(comment);
	      })
	      .catch(error => console.log(error));	    
        }
    });
};

module.exports = { commentController };