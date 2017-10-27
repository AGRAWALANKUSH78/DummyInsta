import moment from 'moment';

import { Post as Post } from '../models/post';

const postController = (req, res) => {
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
    // .populate('like', 'username')
    .then(obj => { 
      obj.duration = moment(obj.time).fromNow();
      if(obj.like.indexOf(req.user.id) > -1){
        obj.likestatus = 'Liked';
      } else {
       	obj.likestatus = 'Like';
      }
      res.render('post', { specificPost : obj });
    })
    .catch(error => console.log(error));
};

export { postController };

