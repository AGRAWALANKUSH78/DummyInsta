var Post = require('../models/post');

function mypostsController (req, res){
	Post.find({ userId : req.user.id})
	  .then((obj) => {
	  	res.render('mypost', { userPosts : obj });
	  })
	  .catch(error => console.log(error));
};

module.exports = { mypostsController }