var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var passport = require('passport');
var mongoStore = require('connect-mongo')(session);
var flash    = require('connect-flash');


var app = express();

mongoose.connect('mongodb://localhost/video');

var user = require('./controllers/user');
require('./config/passport');

var db = mongoose.connection;
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
	store : new mongoStore({mongooseConnection : mongoose.connection})
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

app.use(user);

app.listen(3000, function(){
	console.log("our video server is running on 3000");
})

module.exports = db;
