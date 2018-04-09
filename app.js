var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var stylus = require('stylus');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


var app = express();

// Session manager.
var session = require('express-session');
var RedisStore = require('connect-redis')(session);

// 创建Redis客户端
var config = {
  'cookie' : {'maxAge' : 1800000},
  'sessionStore' : {
    'host' : '127.0.0.1', 
    'port' : '6379',
    'pass' : 'password',
    'db' : 1, 
    'ttl' : 60*30,
    'logErrors' : true
  }
}

app.use(session({
  name : 'sid',
  secret : 'password',
  resave : true,
  rolling : true,
  saveUninitialized : false,
  cookie : config.cookie,
  store: new RedisStore(config.sessionStore),
}));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(stylus.middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'dist')));


app.use('/', indexRouter);
app.use('/users', usersRouter);

// TODO: make route

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
