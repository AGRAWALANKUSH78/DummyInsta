import { Comment as Comment } from '../../models/comment';
import { Post as Post } from '../../models/post';

const postComment = (req, res) => {
	if(req.body.Comment == ""){
		res.json({Comment});
  } else {
	const newComment = new Comment();
	newComment.comment= req.body.Comment;
	newComment.time = new Date();
	newComment.user = req.user._id;
	newComment.reply = [];

	newComment.save((err, comment) => {
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
  }
};

export { postComment };