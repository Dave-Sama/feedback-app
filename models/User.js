const mongoose = require('mongoose');
mongoose.model(
	'users',
	new mongoose.Schema({
		googleID: String,
	})
);
