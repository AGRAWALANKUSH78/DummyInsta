var Post = require('../models/post');

function addPostController(req, res){
	var path = req.file ? req.file.path.replace('uploads', '') : '';

	var post = new Post;
	post.title = req.body.title;
	post.description = req.body.description;
	post.time = new Date();
  post.like = [];
  post.comment = [];
  post.userId = req.user._id;
  post.photoUrl = path;

  post.save(function(err){
	  if(err) {
		  console.log(err);
	  } else {
	    res.redirect('/home');
    }
  });
};

module.exports = { addPostController };