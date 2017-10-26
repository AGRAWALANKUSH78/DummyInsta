var User = require('../models/user');
var Post = require('../models/post');

function userPostsController(req, res) {
	User.findOne({ 'username' : req.params.username })
	  .then((userDetails) => {
	  	Post.find({ 'userId' : userDetails._id })
	  	  .then((obj) => {
	  	  	res.render('userPosts', { postsArr : obj });
	  	  })
	  })
	  .catch(error => console.log(error));
};

module.exports = { userPostsController }