const express = require('express');
const bodyParser = require('body-parser');
const listEndpoints = require('express-list-endpoints')

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// Routes
const auth = require('./auth')
const bounty = require('./bounty')

app.use('/auth', auth);
app.use('/bounty', bounty);

console.log(listEndpoints(app))


app.listen(port, () => console.log(`Listening on port ${port}`));