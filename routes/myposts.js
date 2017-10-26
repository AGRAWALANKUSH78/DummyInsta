var express = require('express');
var router = express.Router();

var myposts = require('../controllers/myposts');

router.get('/myposts', isLoggedIn, myposts.mypostsController);

module.exports = router;

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/login');
}