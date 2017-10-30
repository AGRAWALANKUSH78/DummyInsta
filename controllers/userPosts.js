import { User as User } from '../models/user';
import { Post as Post } from '../models/post';

const getUserPosts = (req, res) => {
	User.findOne({ 'username' : req.params.username })
	  .then((user) => {
	  	if(user._id == req.user.id){
	  		const user = req.user.username;
	  		Post.find({ userId : req.user.id})
	        .then((posts) => {
	  	    res.render('myposts', { Posts : posts, User : user });
	        })
	  	} else {
	  	Post.find({ 'userId' : user._id })
	  	  .then((posts) => {
	  	  	res.render('userPosts', { Posts : posts });
	  	  })
	  	}  
	  })
	  .catch(error => console.log(error));
};

export { getUserPosts };