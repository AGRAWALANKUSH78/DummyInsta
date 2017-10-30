import express from 'express';
const router = express.Router();

import { getHome as getHome } from '../controllers/home';
import { isLoggedIn as isLoggedIn } from '../config/loginAuth';

router.get('/home', isLoggedIn, getHome);

export { router };
