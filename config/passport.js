import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import { User as User } from '../models/user';


passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id, (err, user) => {
		done(err, user);
	});
});


passport.use('local-signup', new LocalStrategy({
	passReqToCallBack : true
}, 
(username, password, done) => {
	User.findOne({'username' : username}, (err,user) => {
		if(err){
			return done(err);
		}
		if(user){
			return done(null, false);
		}

		const newUser = new User();
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
(username, password, done) => {
	User.findOne({'username' : username}, (err,user) => {
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


