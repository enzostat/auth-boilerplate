//require in modules
const express = require('express');
const layouts = require('express-ejs-layouts');
require('dotenv').config();
const flash = require('connect-flash')
const session = require('express-session')

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


//Custom middleware: write data to locals for EVERY page
app.use((req,res, next) => {
	res.locals.alerts = req.flash();
	next();
});


//controllers
app.use('/auth', require('./controllers/auth'))

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