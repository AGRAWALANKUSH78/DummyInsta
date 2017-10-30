import { User as User } from '../models/user';
import { Post as Post } from '../models/post';

const getUserPosts = (req, res) => {
	User.findOne({ 'username' : req.params.username })
	  .then((userDetails) => {
	  	Post.find({ 'userId' : userDetails._id })
	  	  .then((posts) => {
	  	  	res.render('userPosts', { Posts : posts });
	  	  })
	  })
	  .catch(error => console.log(error));
};

export { getUserPosts };