const express = require('express');
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));

// define Routers
const mainRouter = require('./routes/loginRouter.js');
const scriptsRouter = require('./routes/scriptsRouter.js');
const styleRouter = require('./routes/styleRouter.js');
const imageRouter = require('./routes/imageRouter.js');
const myProfileRouter = require('./routes/myProfileRouter.js')
// Setting view engine
app.set('views', 'public/views/');
app.set('view engine', 'ejs');

// Setting Session
app.use(session({
  secret: 'ha9th79t6h5',
  resave: false,
  saveUninitialized: true
  // cookie: {secure: true}
}))

// app.use(router);
app.use('/', mainRouter);
app.use('/login', mainRouter);
app.use('/style', styleRouter);
app.use('/script', scriptsRouter);
app.use('/images', imageRouter);
app.use('/my-profile', myProfileRouter);

app.listen('4000', () => {
	console.log("Listening for 4000");
})