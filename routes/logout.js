import express from 'express';
const router = express.Router();

import { getLogout as getLogout } from '../controllers/logout';
import { isLoggedIn as isLoggedIn } from '../config/loginAuth';

router.get('/logout', isLoggedIn, getLogout);


export { router };
