import moment from 'moment';

import { Post as Post } from '../models/post';

const getPost = (req, res) => {
  Post.findById({ _id : req.params.post_id })
    .populate({
      path: 'comment', 
      populate: {
        path: 'user',
        select: 'username'
      }           
    })
    .populate({
      path : 'comment',
      populate : {
        path : 'reply',
        populate : {
          path : 'user'
        }
      }
    })
    .populate('userId', 'username')
    .populate('like', 'username')
    .then(post => { 
      post.duration = moment(post.time).fromNow();
      post['likestatus'] = 'Like';
      post.like.forEach(function(eachlike){
        if(eachlike._id == req.user.id) {
          post['likestatus'] = 'Liked';
        } 
      });
      res.render('post', { Post : post });
    
  })
  .catch(error => console.log(error));
};


const deletePost = (req, res) => {
  Post.remove({ _id : req.params.post_id }).exec();
  const message = "Post is Deleted";
    res.json({message});
};


const createPost = (req, res) => {
  const path = req.file ? req.file.path.replace('public', '') : '';

  const post = new Post;
  post.title = req.body.title;
  post.description = req.body.description;
  post.time = new Date();
  post.like = [];
  post.comment = [];
  post.userId = req.user._id;
  post.photoUrl = path;

  post.save((err) => {
    if(err) {
      console.log(err);
    } else {
      res.redirect('/home');
    }
  });
};

export { getPost, deletePost, createPost };





















