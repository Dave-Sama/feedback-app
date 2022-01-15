const express = require('express');
const { connectDB } = require('./db/connectDB');
require('./services/passport');
require('dotenv').config({ path: __dirname + '/config/.env' });
const app = express();

// little trick to make it even nicer.
require('./routes/authRoutes')(app);

const port = process.env.PORT || 5000;

const start = async () => {
	try {
		await connectDB(String(process.env.MONGO_URI));
		app.listen(port, () => console.log(`Server is listening on port ${port}`));
	} catch (err) {
		console.log(err);
	}
};

start();
