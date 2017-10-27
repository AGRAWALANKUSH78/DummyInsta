import { Post as Post } from '../models/post';

const likeController = (req, res) => {
  let liked = [];
  let action;
  const userId = req.user.id;   
  Post.findById({ _id : req.params.post_id })
    .then((post) => {
     	liked = post.like;
      if(liked.indexOf(userId) > -1) {
        const position = liked.indexOf(userId);   
        liked.splice(position, 1);            
        post.like.pull(userId);
        action = 'you unliked this post';
      } else {            
        post.like.push(userId);
        action='you liked this post';
      }
      post.save();
      res.json({action});
    })
    .catch(error => console.log(error));
};

export { likeController };