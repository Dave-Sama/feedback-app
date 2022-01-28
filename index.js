const express = require('express');
const { connectDB } = require('./db/connectDB');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');
require('dotenv').config({ path: __dirname + '/config/.env' });

const app = express();

app.use(
	cookieSession({
		// how long the cookie can live inside the browser before it automaticaly exipred - in miliseconds (30 days, 24 hours 60 minutes 60 seconds 1000 miliseconds)
		maxAge: 30 * 24 * 60 * 60 * 1000,
		// allows us to pick multiple keys to encrypt our cookie, keys will randomely choose one of them and use it to encrypt our cookie
		keys: [keys.COOKIEKEY],
	})
);

// tell passport to use the cookieSession
app.use(passport.initialize());
app.use(passport.session());

// little trick to make it even nicer.
require('./routes/authRoutes')(app);

const port = process.env.PORT || 5000;

const start = async () => {
	try {
		await connectDB(String(keys.MONGO_URI));
		app.listen(port, () => console.log(`Server is listening on port ${port}`));
	} catch (err) {
		console.log(err);
	}
};

start();
