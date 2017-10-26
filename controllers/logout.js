function logoutController(req, res){
	req.logout();
	res.redirect('/');
};

module.exports = { logoutController }