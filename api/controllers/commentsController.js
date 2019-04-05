'use strict';
var QueryHelper = require('../helpers/queryHelper.js');
var mongoose = require('mongoose'),
Comment = mongoose.model('comments');
Post = mongoose.model('posts');

exports.newComment = function(req, res) {
  const userId = req.user._id;

  Post.findById(req.params.id, function(err, post) {
    if(QueryHelper.queryError(req, res, err, post))
      return 0;

    post.comments.push(
      {
        userid: userId,
        content: req.body.text,
      }
    );

    post.save(function(err) {
      if (err) {
         res.status(400).json({
            error: err
          });
        throw err;
      }
      res.status(200).json({status: 'Comment Created'});
    })
  });
}

exports.updateComment = function(req, res) {

  const userId = req.user._id;

  Post.findById(req.params.postId, function(err, post) {
    if(QueryHelper.queryError(req, res, err, post))
      return 0;

    if(!post.comments.id(req.params.commentId)) { 
      return res.status(400).json({
        error: 'Invalid Comment'
      });  
    }

    const commentUpdate = post.comments.id(req.params.commentId)

    if(!commentUpdate.userid.equals(userId)) {
      return res.status(400).json({
        error: 'Comment does not belong to user'
      });  
    }

    commentUpdate.content = req.body.text;

    post.save(function(err) {
      if(QueryHelper.queryError(req, res, err))
        return 0;
      res.status(200).json({status: 'Comment Updated'});
    })
  });
}

exports.deleteComment = function(req, res) {
  const commentId = req.params.commentId;

  Post.findById(req.params.postId, function(err, post) {
    if(QueryHelper.queryError(req, res, err, post))
      return 0;

    const userId = req.user._id;

    if(!post.comments.id(commentId)) {
      return res.status(400).json({
        error: 'Invalid Comment'
      }); 
    }
    //if comment does not belong to user
    if(!post.comments.id(commentId).userid.equals(userId)) {
      //check if post belongs to user
      if(post.userid.equals(userId)) {

        post.comments.pull(commentId);

        post.save(function(err) {
          if(QueryHelper.queryError(req, res, err))
            return 0;

          return res.status(200).json({status: 'Comment Deleted'});
        })
      }
    }

    //else check if comment belong to user
    else {
      if(post.comments.id(commentId).userid.equals(userId)) {
        post.comments.pull(commentId);

        post.save(function(err) {
          if(QueryHelper.queryError(req, res, err))
            return 0;

          res.status(200).json({status: 'Comment Deleted'});
        })
      }

      else {
        res.status(400).json({
          error: 'Comment does not belong to user'
        });
      }
    }
  });
}