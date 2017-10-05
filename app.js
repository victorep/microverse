//Load express modules
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const events = require('./routes/events');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Start the Http server
app.listen(3000, function() {
    console.log('App listening on port 3000')
});

app.use('/events', events)

module.exports = app