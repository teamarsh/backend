const createError = require('http-errors');
const express = require('express');
const cors = require('cors')
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport')
require('dotenv').config()
// const bootstrap = require('bootstrap');

// const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const conf = require('./config/index');

const app = express();


// view engine setup
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(cors({origin:'*'}))
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(passport.initialize());
require('./lib/passport')(passport)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session(conf.get("session")));
app.use(express.static(path.join(__dirname, '/public')));
// app.use('/views', express.static(__dirname + '/view'));
// app.use('/scripts', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
// app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
// app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'));

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback', passport.authenticate('facebook', {
   successRedirect: '/account',
   failureRedirect: '/login'
  }));
app.use('/users', usersRouter);
app.get('/', (req, res) => {
  res.render('index');
});
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
