import { User as User } from '../models/user';
import { Post as Post } from '../models/post';

const userPostsController = (req, res) => {
	User.findOne({ 'username' : req.params.username })
	  .then((userDetails) => {
	  	Post.find({ 'userId' : userDetails._id })
	  	  .then((obj) => {
	  	  	res.render('userPosts', { postsArr : obj });
	  	  })
	  })
	  .catch(error => console.log(error));
};

export { userPostsController };