var express = require('express');
var router = express.Router();
var multer = require('multer');
var passport = require('passport');
var moment = require('moment');

var User = require('../models/user');
var Post = require('../models/post');
var Comment = require('../models/comment');
var Reply = require('../models/reply');


router.get('/', checkLogin, (req, res) => {
	res.render('index');
});


router.get('/signup', checkLogin, (req, res) => {
	res.render('signup');
});


router.get('/login', checkLogin, (req, res) => {
	res.render('login');
});


router.post('/login', passport.authenticate('local-login', {
	successRedirect : '/home',
	failureRedirect : '/signup',
	failureFlash : true
}));


router.post('/signup', passport.authenticate('local-signup', {
	successRedirect : '/home',
	failureRedirect : '/signup',
	failureFlash : true
}));


router.get('/logout', isLoggedIn, (req, res) => {
	req.logout();
	res.redirect('/');
});


router.get('/home', isLoggedIn, (req, res) => {
	Post.find({}, (err, arr) => {
    if(err){
		  console.log(err);
	  } else {			
	    res.render('home', { allPosts : arr});
	  }
	});
});


router.get('/myposts', isLoggedIn, (req, res) => {
	Post.find({ userId : req.user.id})
	  .then((obj) => {
	  	res.render('mypost', { userPosts : obj});
	  })
	  .catch(error => console.log(error));
});


router.get('/post/:post_id/delete' , isLoggedIn, (req, res) => {
	Post.remove({ _id : req.params.post_id }).exec();
	res.redirect('/myposts');
});



router.get('/post/:post_id' , isLoggedIn, (req, res) => {
  Post.findById({ _id : req.params.post_id })
    .populate({
      path: 'comment', 
      populate: {
        path: 'user',
        select: 'username'
      }           
    })
    .populate({
      path : 'comment',
      populate : {
        path : 'reply',
        populate : {
        	path : 'user'
        }
      }
    })
    .populate('userId', 'username')
    // .populate('like', 'username')
    .then(obj => { 
      obj.duration = moment(obj.time).fromNow();
      if(obj.like.indexOf(req.user.id) > -1){
        obj.likestatus = 'Liked';
      } else {
       	obj.likestatus = 'Like';
      }
      res.render('post', { specificPost : obj });
    })
    .catch(error => console.log(error));
});



router.post('/post/:post_id/like', isLoggedIn, (req, res) => {
  let liked = [];
  let action;
  const userId = req.user.id;   
  Post.findById({ _id : req.params.post_id })
    .then((post) => {
     	liked = post.like;
      if(liked.indexOf(userId) > -1) {
        const position = liked.indexOf(userId);   
        liked.splice(position, 1);            
        post.like.pull(userId);
        action = 'you unliked this post';
      } else {            
        post.like.push(userId);
        action='you liked this post';
      }
      post.save();
      res.json({action});
    })
    .catch(error => console.log(error));
});


router.post('/post/:post_id/comment', isLoggedIn, (req, res) => {
	var newComment = new Comment();
	newComment.comment= req.body.ajaxComment;
	newComment.time = new Date();
	newComment.user = req.user._id;
	newComment.reply = [];

	newComment.save(function(err, comment){
	  if(err) {
	    console.log(err);
	  } else {
	  	Post.findById({ _id : req.params.post_id })
	      .then((post) => {
	  	    post.comment.push(comment._id);	
	  	    post.save(); 
	  	    res.json(comment);
	      })
	      .catch(error => console.log(error));	    
        }
    });
});


router.post('/post/:post_id/comment/:comment_id/reply', isLoggedIn, (req, res) => {
	var newReply = new Reply();
	newReply.reply = req.body.ajaxReply;
	newReply.time = new Date();
	newReply.user = req.user._id;

	newReply.save(function (err, reply){
		if(err){
			console.log(err);
		} else {
			Comment.findById({ _id : req.params.comment_id })
			  .then((comment) => {
			  	comment.reply.push(reply._id);
			  	comment.save();
			  	res.json(reply);
			  })
			  .catch(error => console.log(error));
		}
	});
});




/*var multerConf = { ***********************
	storage : multer.diskStorage({
		destination : function(req, file, next){
			next(null, './public');
		},
		filename : function (req, file, next){
			// console.log(file);
			var ext = file.mimetype.split('/')[1];
			next(null, file.fieldname + '-' + Date.now + ext);
		} 
	}),
	fileFilter: function(req, file, next){
		if(!file){
			next();
		}
		var image = file.mimetype.startsWith('image/');
		if(image){
			(null, true);
		} else {
			next ({message : "file not supported"}, false);
		}
	}
};
*/

var upload = multer({ dest: 'uploads/' })

router.get('/add-post', function(req, res){
	res.render('add-post');
});


router.post('/add-post', upload.single('image'), function(req, res){
	var path = req.file ? req.file.path.replace('uploads', '') : '';

/*	if(req.file){
		console.log(req.file);
		req.body.image = req.file.filename;
	}
*/
	var post = new Post;
	post.title = req.body.title;
	post.description = req.body.description;
	post.time = new Date();
  post.like = [];
  post.comment = [];
  post.userId = req.user._id;
  post.photoUrl = path;

  post.save(function(err){
	  if(err) {
		  console.log(err);
	  } else {
	    res.redirect('/home');
    }
  });
});


module.exports = router;

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/login');
}

function checkLogin(req, res, next){
	if((req.url === '/login' || req.url === '/signup' || req.url === '/') && (req.user)){
		res.redirect('/home');		
	}
	return next();
}