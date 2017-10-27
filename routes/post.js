import express from 'express';
const router = express.Router();

import { postController as postController } from '../controllers/post';
import { likeController as likeController } from '../controllers/like';
import { commentController as commentController } from '../controllers/comment';
import { replyController as replyController } from '../controllers/reply';
import { userPostsController as userPostsController } from '../controllers/userPosts';
import { deleteController as deleteController } from '../controllers/deletePost';
import { isLoggedIn as isLoggedIn } from '../config/loginAuth';



router.get('/post/:post_id' , isLoggedIn, postController);

router.post('/post/:post_id/like', isLoggedIn, likeController);

router.post('/post/:post_id/comment', isLoggedIn, commentController);

router.post('/post/:post_id/comment/:comment_id/reply', isLoggedIn, replyController);

router.get('/post/user/:username', isLoggedIn, userPostsController);

router.get('/post/:post_id/delete' , isLoggedIn, deleteController);


export { router };
