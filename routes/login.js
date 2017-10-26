var express = require('express');
var router = express.Router();
var passport = require('passport');


router.get('/', checkLogin, (req, res) => {
	res.render('index');
});


router.get('/login', checkLogin, (req, res) => {
	res.render('login');
});


router.post('/login', passport.authenticate('local-login', {
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

