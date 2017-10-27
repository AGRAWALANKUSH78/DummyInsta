import { Post as Post } from '../models/post';

const homeController = (req, res) => {
	Post.find({}, (err, arr) => {
    if(err){
		  console.log(err);
	  } else {			
	    res.render('home', { allPosts : arr});
	  }
	});
};

export { homeController };