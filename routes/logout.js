import express from 'express';
const router = express.Router();

import { logoutController as logoutController } from '../controllers/logout';
import { isLoggedIn as isLoggedIn } from '../config/loginAuth';

router.get('/logout', isLoggedIn, logoutController);


export { router };
