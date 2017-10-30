import { Post as Post } from '../models/post';

const getHome = (req, res) => {
	const user = req.user;
	console.log(user);

	Post.find({}, (err, posts) => {
    if(err){
		  console.log(err);
	  } else {			
	    res.render('home', { Posts : posts, User : user });
	  }
	});
};

export { getHome };