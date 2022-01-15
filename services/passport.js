const passport = require('passport');
const googleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

// tell the passport that I want to authenticate my users with google
passport.use(
	new googleStrategy(
		{
			clientID: keys.googleCliendID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback',
		},
		// Access Token : allows us to reach back to google and say that in the past this user said we can read their profile.
		// Refresh Token: Allows us to refresh the Access Tocken, because the AT expires after some amount of time.
		//profile: Has all of out actual identifying information.
		(acceessToken, refreshToken, profile, done) => {
			console.log('Access token: ' + acceessToken);
			console.log('Refresh token: ' + refreshToken);
			console.log('Profile: ', profile);
		}
	)
);
