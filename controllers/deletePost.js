import { Post as Post } from '../models/post';

const deleteController = (req, res) => {
	Post.remove({ _id : req.params.post_id }).exec();
	res.redirect('/myposts');
};

export{ deleteController };