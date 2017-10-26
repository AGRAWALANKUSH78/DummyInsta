var express = require('express');
var router = express.Router();

var deletePost = require('../controllers/deletePost')

router.get('/post/:post_id/delete' , isLoggedIn, deletePost.deleteController);

module.exports = router;

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/login');
}