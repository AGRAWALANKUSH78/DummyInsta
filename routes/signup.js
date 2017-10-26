var express = require('express');
var router = express.Router();
var passport = require('passport');


router.get('/signup', checkLogin, (req, res) => {
	res.render('signup');
});


router.post('/signup', passport.authenticate('local-signup', {
	successRedirect : '/home',
	failureRedirect : '/signup',
	failureFlash : true
}));



module.exports = router;

function checkLogin(req, res, next){
	if((req.url === '/login' || req.url === '/signup' || req.url === '/') && (req.user)){
		res.redirect('/home');		
	}
	return next();
};