const express = require('express');
const app = express();

app.get('/greeting', (req, res) => {
	res.send({ bye: 'bye!' });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log('Server listening on port ' + port));
