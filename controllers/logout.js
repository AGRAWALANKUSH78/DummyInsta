const logoutController = (req, res) => {
	req.logout();
	res.redirect('/');
};

export { logoutController };