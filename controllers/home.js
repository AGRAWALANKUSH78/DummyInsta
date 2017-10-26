var Post = require('../models/post');

function homeController(req, res) {
	Post.find({}, (err, arr) => {
    if(err){
		  console.log(err);
	  } else {			
	    res.render('home', { allPosts : arr});
	  }
	});
};

module.exports = { homeController };