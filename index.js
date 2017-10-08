var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var logger = require('morgan');
var favicon = require('serve-favicon');
var http = require('http');
var socket = require('socket.io');
var nodemailer = require('nodemailer');
var async = require('async');
var MongoClient = require('mongodb').MongoClient;
var format = require('util').format;
var mongoose = require('mongoose');
var ejs = require('ejs');
mongoose.Promise = global.Promise;

var dburl = 'mongodb://quotabitadmin:quotabitadmin@ds147274.mlab.com:47274/quotabit';


// Connect To Database
mongoose.connect(dburl);
var db = mongoose.connection;

// Routes
var indexroutes = require('./routes/index');
var agentroutes = require('./routes/agent');
var planroutes = require('./routes/plans');
var testroutes = require('./routes/test');

// Initialize App
var app = express();

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
// Set static Folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser('loOkAtmyDAI3'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(logger('dev'));

// Express Session
app.use(session({
  secret: 'loOkAtmyDAI3',
  saveUninitialized: true,
  resave: true
}));


//Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value){
    var namespace = param.split('.')
    , root = namespace.shift()
    , formParam = root;

  while(namespace.length){
    formParam += '[' + namespace.shift() + ']';
  }
  return {
    param: formParam,
    msg: msg,
    value: value
  };
  }
}));

// Connect Flash Middleware
app.use(flash());


// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());




// Global Variables
app.use((function(req, res, next){
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
}));

// Routes
app.use('/', indexroutes);
app.use('/agent', agentroutes);
app.use('/plans', planroutes);
app.use('/test', testroutes);


var port = process.env.PORT || 5000;

app.listen(port, function(){
  console.log('Node app is running on port 5000');
});