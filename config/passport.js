var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// var flash    = require('connect-flash');

var User = require('../models/user');


passport.serializeUser(function(user, done){
	done(null, user.id);
});

passport.deserializeUser(function(id, done){
	User.findById(id, function(err, user){
		done(err, user);
	});
});


passport.use('local-signup', new LocalStrategy({
	passReqToCallBack : true
}, 
function(username, password, done){

	User.findOne({'username' : username}, function(err,user){
		if(err){
			return done(err);
		}
		if(user){
			return done(null, false);
		}

		var newUser = new User();
		// newUser.name = req.body.name;
		newUser.username = username;
		newUser.password = newUser.encryptPassword(password);

		newUser.save(function(err){
			if(err){
				return done(err);
			}

			return done(null, newUser);
		});
	});

}));


passport.use('local-login', new LocalStrategy({
	usernameField : 'username',
	passwordField : 'password',
	passReqToCallBack : true
}, 
function(username, password, done){

	User.findOne({'username' : username}, function(err,user){
		if(err){
			return done(err);
		}

		if(!user){
			return done(null, false);
		}

		if(!user.validPassword(password)){
			return done(null, false);
		};

			return done(null, user);

	});
	
}));


