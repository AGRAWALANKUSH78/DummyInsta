var express = require('express');
var router = express.Router();

var post = require('../controllers/post');
var like = require('../controllers/like');
var comment = require('../controllers/comment');
var reply = require('../controllers/reply');
var userPosts = require('../controllers/userPosts');




router.get('/post/:post_id' , isLoggedIn, post.postController);

router.post('/post/:post_id/like', isLoggedIn, like.likeController);

router.post('/post/:post_id/comment', isLoggedIn, comment.commentController);

router.post('/post/:post_id/comment/:comment_id/reply', isLoggedIn, reply.replyController);

router.get('/post/user/:username', isLoggedIn, userPosts.userPostsController);


module.exports = router;

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/login');
}
