import express from 'express';
import multer from 'multer';
const router = express.Router();

const upload = multer({ dest: 'public/images' });

import { getPost, deletePost, createPost } from '../controllers/post';
import { postLike as postLike } from '../controllers/post/like';
import { postComment as postComment } from '../controllers/post/comment';
import { postReply as postReply } from '../controllers/post/reply';
import { isLoggedIn as isLoggedIn } from '../config/loginAuth';


router.get('/post', isLoggedIn, (req, res) => {
	res.render('add-post');
});

router.post('/post', upload.single('image'), createPost);

router.get('/post/:post_id' , isLoggedIn, getPost);

router.post('/post/:post_id/like', isLoggedIn, postLike);

router.post('/post/:post_id/comment', isLoggedIn, postComment);

router.post('/post/:post_id/comment/:comment_id/reply', isLoggedIn, postReply);

router.delete('/post/:post_id/delete' , isLoggedIn, deletePost);


export { router };
