import express from 'express';
const router = express.Router();

import { homeController as homeController } from '../controllers/home';
import { isLoggedIn as isLoggedIn } from '../config/loginAuth';

router.get('/home', isLoggedIn, homeController);

export { router};
