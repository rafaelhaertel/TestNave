var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  User = require('./api/models/userModel.js');
  Post = require('./api/models/postModel.js');
  bodyParser = require('body-parser');
  cookieParser = require('cookie-parser');
  passport = require('passport');
  localStrategy = require('passport-local' ).Strategy;


// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Tododb'); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'something',
    rolling: true,
    resave: false,
    saveUninitialized: true,
    cookie: { expires: new Date(Date.now()+ 7200000) }
}));
app.use(passport.initialize());
app.use(passport.session());


app.use(function(req,res,next){
  if (req.isAuthenticated()) {
    req.session._garbage = Date();
    req.session.touch();
  }
  next()
})

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


var routes = require('./api/routes/userRoutes'); //importing route
// routes
app.use('/user/', routes);


app.listen(port);


console.log('todo list RESTful API server started on: ' + port);