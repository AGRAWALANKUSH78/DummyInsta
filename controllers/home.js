import { Post as Post } from '../models/post';

const getHome = (req, res) => {
	Post.find({}, (err, posts) => {
    if(err){
		  console.log(err);
	  } else {			
	    res.render('home', { Posts : posts});
	  }
	});
};

export { getHome };