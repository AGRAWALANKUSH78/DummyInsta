import express from 'express';
const router = express.Router();

import { getUserPosts as getUserPosts } from '../controllers/userPosts';

router.get('/user/:username', isLoggedIn, getUserPosts);


import { isLoggedIn as isLoggedIn } from '../config/loginAuth';

export { router };

