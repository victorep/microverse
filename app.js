//Load express modules
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

//Load mongoose modules
var mongoose = require('mongoose');

//Connect to the mongo DB
mongoose.connect('mongodb://localhost/microverse', {useMongoClient: true});

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    //console.log("We're succesfully connected!")
});


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Start the Http server
app.listen(3000, function() {
    console.log('App listening on port 3000')
});

app.use('/events', require('./routes/events'))

app.use('/users', require('./routes/users'))

module.exports = app