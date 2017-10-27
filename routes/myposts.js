import express from 'express';
const router = express.Router();

import { mypostsController as mypostsController } from '../controllers/myposts';
import { isLoggedIn as isLoggedIn } from '../config/loginAuth';

router.get('/myposts', isLoggedIn, mypostsController);

export { router };

