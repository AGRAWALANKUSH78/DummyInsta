var express = require('express');
var router = express.Router();

var home = require('../controllers/home');

router.get('/home', isLoggedIn, home.homeController);

module.exports = router;

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/login');
}