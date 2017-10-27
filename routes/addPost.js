import express from 'express';
import multer from 'multer';
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

import { addPostController as addPostController } from '../controllers/addPost';
import { isLoggedIn as isLoggedIn } from '../config/loginAuth';


router.get('/add-post', isLoggedIn, (req, res) => {
	res.render('add-post');
});

router.post('/add-post', upload.single('image'), addPostController);


export { router} ;


