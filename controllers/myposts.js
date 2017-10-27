import { Post as Post } from '../models/post';

const mypostsController = (req, res) => {
	Post.find({ userId : req.user.id})
	  .then((obj) => {
	  	res.render('mypost', { userPosts : obj });
	  })
	  .catch(error => console.log(error));
};

export { mypostsController };