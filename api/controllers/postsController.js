'use strict';
var QueryHelper = require('../helpers/queryHelper.js');
var mongoose = require('mongoose'),
User = mongoose.model('users');
Post = mongoose.model('posts');

exports.newPost = function(req, res) {
  const userId = req.user._id;

  const currenPost = Post({
    userid: userId,
    content: req.body.text,
  })

  currenPost.save(function(err) {
    if(QueryHelper.queryError(req, res, err))
      return 0;

    else {
      User.findById(userId, function(err, user) {
        if(QueryHelper.queryError(req, res, err, user))
         return 0;

        user.posts.push(currenPost._id);

        user.save(function(err) {
          if(QueryHelper.queryError(req, res, err))
           return 0;
          res.status(200).json({
            status: 'Post Created'
          });
        });
      });
    }
  });
}

exports.allPosts = function(req, res) {
  Post.find({}).sort('-date').exec(function(err, posts) {
    if(QueryHelper.queryError(req, res, err, posts))
      return 0;
    res.status(200).json({
      posts: posts
    });
  });
}

exports.userPosts = function(req, res) {
  const userId = req.user._id;

  Post.find({"userid": userId}, function(err, posts) {
    if(QueryHelper.queryError(req, res, err, posts))
      return 0;

    res.status(200).json({
      posts: posts
    });
  });
}

exports.updatePost = function(req, res, next) {
  const postId = req.params.id;

  Post.findById(postId, function(err, post) {
    if(QueryHelper.queryError(req, res, err, post))
      return 0;

    const userId = req.user._id;
    const newPost = req.body.text;

    if(post.userid.equals(userId)){
      post.content = newPost;

      post.save(function(err) {
        if(QueryHelper.queryError(req, res, err))
          return 0;

        res.status(200).json({message: 'Post Updated'});
      });
    }

    else {
      res.status(400).json({
        error: 'Post does not belong to user'
      });
    }
  });
}

exports.singlePost = function(req, res) {
  const postId = req.params.id;

  Post.findById(req.params.id, function(err, post) {
    if(QueryHelper.queryError(req, res, err, post))
      return 0;

    res.status(200).json({post: post});
  })
};

exports.deletePost = function(req, res) {
  const userId = req.user._id;
  const postId = req.params.id;

  Post.findById(postId, function(err, post) {
    if(QueryHelper.queryError(req, res, err, post))
      return 0;

    if(post.userid.equals(userId)){

       User.findById(userId, function(err, user) {
        if(QueryHelper.queryError(req, res, err, user))
          return 0;

        user.posts.pull(postId);

        user.save(function(err) {
          if(QueryHelper.queryError(req, res, err))
            return 0;
        })

        post.delete(function(err) {
          if(QueryHelper.queryError(req, res, err))
            return 0;
          res.status(200).json({message: 'Post Deleted'});
        });
      });
    }

    else {
      res.status(400).json({
        error: 'Post does not belong to user'
      });
    }
  });
};