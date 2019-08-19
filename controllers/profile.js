const isLoggedIn = require('../middleware/isLoggedIn');
const isAdminLoggedIn = require('../middleware/isAdminLoggedIn')
const router = require('express').Router();





//GET /profile
router.get('/',isLoggedIn, (req,res) => {
	res.render('profile/index')
})

router.get('/admin',isAdminLoggedIn, (req,res) => {
	res.render('profile/admin')
})


module.exports = router;