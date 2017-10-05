//Load express modules
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const events = require('./routes/events');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

module.exports = app

// Start the Http server
app.listen(3000, function() {
    console.log('Example app listening on :3000')
});

app.use('/events', events)