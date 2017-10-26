var Post = require('../models/post');

function deleteController(req, res){
	Post.remove({ _id : req.params.post_id }).exec();
	res.redirect('/myposts');
};

module.exports = { deleteController };