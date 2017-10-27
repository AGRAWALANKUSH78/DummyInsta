import { Post as Post } from '../models/post';


const addPostController = (req, res) => {
	const path = req.file ? req.file.path.replace('uploads', '') : '';

	const post = new Post;
	post.title = req.body.title;
	post.description = req.body.description;
	post.time = new Date();
  post.like = [];
  post.comment = [];
  post.userId = req.user._id;
  post.photoUrl = path;

  post.save((err) => {
	  if(err) {
		  console.log(err);
	  } else {
	    res.redirect('/home');
    }
  });
};

export { addPostController };