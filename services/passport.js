const passport = require('passport');
const mongoose = require('mongoose');
const googleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config({ path: __dirname + '../config/.env' });
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id).then((user) => done(null, user));
});

// console.log(process.env.GOOGLE_CLIENT_ID);
// tell the passport that I want to authenticate my users with google
passport.use(
	new googleStrategy(
		{
			// clientID: process.env.GOOGLE_CLIENT_ID,
			// clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			clientID: keys.googleCliendID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback',
		},
		// Access Token : allows us to reach back to google and say that in the past this user said we can read their profile.
		// Refresh Token: Allows us to refresh the Access Tocken, because the AT expires after some amount of time.
		//profile: Has all of out actual identifying information.
		(acceessToken, refreshToken, profile, done) => {
			User.findOne({ googleID: profile.id }).then((existingUser) => {
				if (existingUser) {
					done(null, existingUser);
				} else {
					new User({ googleID: profile.id })
						.save()
						.then((user) => done(null, user));
				}
			});

			// console.log('Access token: ' + acceessToken);
			// console.log('Refresh token: ' + refreshToken);
			// console.log('Profile: ', profile);
		}
	)
);
