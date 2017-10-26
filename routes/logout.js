var express = require('express');
var router = express.Router();

var logout = require('../controllers/logout')

router.get('/logout', isLoggedIn, logout.logoutController);


module.exports = router;

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/login');
}