import express from 'express';
import passport from 'passport';
const router = express.Router();


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


export { router } ;

function checkLogin(req, res, next){
	if((req.url === '/login' || req.url === '/signup' || req.url === '/') && (req.user)){
		res.redirect('/home');		
	}
	return next();
};

