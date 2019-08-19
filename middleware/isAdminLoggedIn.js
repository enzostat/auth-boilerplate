module.exports = (req,res,next) => {
	//if user is logged in
	if (req.user && req.user.admin) {
		//cool. this is expected. they are logged in. allow them to proceed
		next();
	} else if (req.user) { //user is logged in but not an admin
		req.flash('error', 'You must be an Admin to view this page');
		res.redirect('/profile')

	} else {
	//otherwise, user is not logged in
	//not cool. don't let them in. make them log in first
	req.flash('error', 'You must be logged in as an Admin to view this page');
	res.redirect('/auth/login');
	}
}