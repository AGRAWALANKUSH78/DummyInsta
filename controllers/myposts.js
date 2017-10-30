import { Post as Post } from '../models/post';

const getMyPosts = (req, res) => {
	Post.find({ userId : req.user.id})
	  .then((posts) => {
	  	res.render('myposts', { Posts : posts });
	  })
	  .catch(error => console.log(error));
};

export { getMyPosts };