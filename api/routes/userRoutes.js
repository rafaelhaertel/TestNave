var express = require('express');
var router = express.Router();
var passport = require('passport');

var userList = require('../controllers/userController');
var postList = require('../controllers/postsController');
var commentList = require('../controllers/commentsController');

var User = require('../models/userModel.js');


router.post('/register', userList.register);
router.post('/login', userList.login);
router.delete('/remove', restrict, userList.deleteUser)
router.get('/logout', restrict, userList.logout);
router.get('/status', restrict, userList.status);
router.put('/updateusername', restrict, userList.updateusername);
router.put('/updatepassword', restrict, userList.updatepassword);
router.post('/newpost', restrict, postList.newPost)
router.put('/updatepost/:id', restrict, postList.updatePost)
router.delete('/deletepost/:id', restrict, postList.deletePost)
router.get('/allposts', restrict, postList.allPosts)
router.get('/userposts', restrict, postList.userPosts)
router.get('/post/:id/', restrict, postList.singlePost)
router.post('/post/:id/newcomment', restrict, commentList.newComment)
router.put('/post/:postId/comment/:commentId', restrict, commentList.updateComment)
router.delete('/post/:postId/comment/:commentId', restrict, commentList.deleteComment)


function restrict(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.status(401).json({
      status: 'User not logged in'
    });
  }
  else {
    next();
  }
}




module.exports = router;