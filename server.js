import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'express-session';
import mongoose from 'mongoose';
import passport from 'passport';
import flash from 'connect-flash';
import mongoStore from 'connect-mongo';

const MongoStore = mongoStore(session);

const app = express();

mongoose.connect('mongodb://localhost/video');

import { router as post } from './routes/post';
import { router as login } from './routes/login';
import { router as signup } from './routes/signup';
import { router as logout } from './routes/logout';
import { router as home } from './routes/home';
import { router as myposts } from './routes/myposts';
import { router as addPost } from './routes/addPost';


require('./config/passport');

const db = mongoose.connection;   
db.once('open', function(){
  console.log('connection to database is established');
});

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('uploads'));
app.use(cookieParser());

app.use(session({
	secret : 'tocatocatoca',
	resave : true,
	saveUninitialized : true,
	store : new MongoStore({mongooseConnection : mongoose.connection})
}));

// middleware for preventing back button after logout
app.use(function(req, res, next) {
  if (!req.user)
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    next();
});

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(post);
app.use(login);
app.use(signup);
app.use(logout);
app.use(home);
app.use(myposts);
app.use(addPost)

app.listen(3000, () => {
	console.log("our video server is running on 3000");
})
