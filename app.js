/*jshint esversion: 6*/
//Modifications of app.js to include several features
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const layouts = require("express-ejs-layouts");
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('./routes/auth');
const index = require('./routes/index');
const github = require('./routes/github');
const users = require('./routes/users');
const MongoStore         = require('connect-mongo')(session);

require("dotenv").config();
//require files for events
const api = require('./routes/api/index.js');
const events = require('./routes/events/index.js');

const app = express();
mongoose.connect(process.env.MONGODB_URI);

// view engine setup
app.use(layouts);
app.set("layout", "layouts/default");
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));

//passport session configuration
app.use(session({
 secret: 'our-passport-local-strategy-app',
 resave: true,
 saveUninitialized: true,
 store: new MongoStore( { mongooseConnection: mongoose.connection })

}));
//passport middleware configuration
app.use(passport.initialize());
app.use(passport.session());
app.use('/', index);
app.use('/auth/github', github);
app.use('/users', users);

//routes included for events
app.use('/api', api);
app.use('/events', events);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

//Probando rama develop-events
