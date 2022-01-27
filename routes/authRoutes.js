const passport = require('passport');

module.exports = (app) => {
	// this route manages entirely by passport,
	// it says after a user want to authonticated with google, it will activate the googleStrategy config, and ask for the profile&email of the user.
	// this route handler is here to get the code from google
	app.get(
		'/auth/google',
		passport.authenticate('google', { scope: ['profile', 'email'] })
	);

	// this route handler here to exchage the given code with the required information about the user.
	app.get('/auth/google/callback', passport.authenticate('google'));

	app.get('/api/current_user', (req, res) => {
		res.send(req.user);
	});

	app.get('api/logout', (req, res) => {
		req.logout();
		res.send(req.user);
	});
};
