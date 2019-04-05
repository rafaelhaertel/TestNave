'use strict';


var mongoose = require('mongoose'),
User = mongoose.model('users');

exports.status = function(req, res) {

  if (!req.isAuthenticated()) {
    return res.status(401).json({
      status: false,
      err: "user not logged in",
    });
  }

  else {
    const userId = req.user._id;
    User.findById(userId, function(err, user) {
    if (err) {
      res.status(400).json({message: 'Error = ' + err});
      throw err;
    }

    res.status(200).json(user);
    });
  }
}

exports.register = function(req, res) {

  User.find({}, function(err, users) {
    if (err) {
      res.status(400).json({message: 'Error = ' + err});
      throw err;
    } 
    
    else {
      User.register(new User({ username: req.body.username,
       admin: false}),
        req.body.password, function(err, account) {
        if (err) {
          return res.status(500).json({
            err: err
          });
        }
        passport.authenticate('local')(req, res, function () {
          return res.status(200).json({
            status: 'Registration successful!'
          });
        });
      });
    }
  });
}

exports.deleteUser = function(req, res) {
  const userId = req.user._id;
  User.findByIdAndRemove(userId, function(err) {
    if (err) {
      res.status(400).json({message: 'Error = ' + err});
      throw err;
    }

    res.status(200).json({message: 'User Removed'});
  });
};

exports.updateusername = function(req, res, next) {
  const userId = req.user._id;
  const newUsername = req.body.newusername;

    User.findById(userId, function(err, user) {
    if (err) {
      res.status(400).json({message: 'Error = ' + err});
      throw err;
    }

    user.username = newUsername;

    user.save(function(err) {
      if (err) {
        res.status(400).json({message: 'Error = ' + err});
        throw err;
      }

      res.status(200).json({message: 'username reset successful'});
    });
  });
}

exports.updatepassword = function(req, res, next) {
  const userId = req.user._id;
  const oldpassword = req.body.oldpassword;
  const newpassword = req.body.newpassword;

  User.findById(userId).then(function(sanitizedUser){
  if (sanitizedUser){
      sanitizedUser.changePassword(oldpassword, newpassword, function(err, user, info){
        if (err) {
          res.status(400).json({message: 'Error = ' + err});
          throw err;
        }
          sanitizedUser.save();
          res.status(200).json({message: 'password reset successful'});
          
      });
  } else {
      res.status(500).json({message: 'This user does not exist'});
  }
  },function(err){
      console.error(err);
  })

}

exports.login = function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({
          err: 'Could not log in user'
        });
      }
      req.session.cookie.expires = new Date(Date.now()+ 7200000);
      res.status(200).json({
        status: 'Login successful!'
      });
    });
  })(req, res, next);
}

exports.logout = function(req, res) {
  req.logout();
  res.status(200).json({
    status: 'Bye!'
  });
}