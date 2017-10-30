import express from 'express';
import passport from 'passport';
const router = express.Router();


router.get('/signup', checkLogin, (req, res) => {
	res.render('signup');
});


router.post('/signup', passport.authenticate('local-signup', {
	successRedirect : '/home',
	failureRedirect : '/signup',
	failureFlash : true
}));



export { router} ;

function checkLogin(req, res, next){
	if((req.url === '/login' || req.url === '/signup' || req.url === '/') && (req.user)){
		res.redirect('/home');		
	}
	return next();
};