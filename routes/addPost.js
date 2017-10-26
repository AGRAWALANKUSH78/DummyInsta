var express = require('express');
var router = express.Router();
var multer = require('multer');

var upload = multer({ dest: 'uploads/' });

var addPost = require('../controllers/addPost');


router.get('/add-post', isLoggedIn, function(req, res){
	res.render('add-post');
});

router.post('/add-post', upload.single('image'), addPost.addPostController);


module.exports = router;

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/login');
}
