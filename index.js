//require in modules
const express = require('express');
const layouts = require('express-ejs-layouts');
require('dotenv').config();
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('./config/passportConfig');

//instantiate the express app
const app = express();

//set up middleware or settings
app.set('view engine', 'ejs');
app.use(layouts);
app.use('/', express.static('static'));
app.use(express.urlencoded({ extended: false }));
app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: true

}));
app.use(flash()); //after session
app.use(passport.initialize());
app.use(passport.session());


//Custom middleware: write data to locals for EVERY page
app.use((req,res, next) => {
	res.locals.alerts = req.flash();
	res.locals.currentUser = req.user;
	next();
});


//controllers
app.use('/auth', require('./controllers/auth'));
app.use('/profile', require('./controllers/profile'));

//routes
app.get('/', (req,res) => {
	res.render('home')
})

app.get('/*', (req,res) => {
	res.render('404')
})



//listen
app.listen(process.env.PORT, () => {
	console.log("Server is now running at port", process.env.PORT)
})