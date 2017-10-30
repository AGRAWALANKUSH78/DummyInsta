import express from 'express';
const router = express.Router();

import { getMyPosts as getMyPosts } from '../controllers/myposts';
import { isLoggedIn as isLoggedIn } from '../config/loginAuth';

router.get('/myposts', isLoggedIn, getMyPosts);

export { router };

