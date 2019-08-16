//requires
let router = require('express').Router();
const db = require('../models');

module.exports = router;




router.get('/signup', (req,res) => {
	res.render('auth/signup')
})

router.post('/signup', (req,res) => {
	if (req.body.password !== req.body.password_verify) {
		req.flash('error', "Passwords do not match!");
		res.redirect('/auth/signup');
	} else {
		//passwords matched, create user if they don't already exist
		db.user.findOrCreate({
			where: { email: req.body.email },
			defaults: req.body
		})
		.spread((user, wasCreated) => {
			if (wasCreated) {
				//this was legitimately a new user so they got created
				res.send('Successful creation of user. TODO: Auto login');
			} else {
				//user was found, don't let them create a new account, make them log in
				req.flash('error', "Account already exists. Please log in!");
				res.redirect('/auth/login')
			}
		})
		.catch(err => {
			//print ALL the error info to the console
			console.log("Error in POST /auth/signup", err);
			//make generic error for the flash message
			req.flash('error', "Something went wrong")

			//Get validation-specific errors (becausew they are ok to show to user)
			if (err & err.errors) {
				err.errors.forEach(e => {
					if (e.type === 'Validation error') {
						req.flash('error', 'Validation issue - ', +e.message);
					}
				})
			}
			//redirect user to sign-up page so they can try again
			res.redirect('/auth/signup')
		})
	}
})

router.get('/login', (req,res) => {
	res.render('auth/login')
})

router.post('/login', (req,res) => {
	res.send('STUB - ToDo: Login then redirect')
})

router.get('/logout', (req,res) => {
	res.render('auth/logout')
})



