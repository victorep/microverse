//Load mongoose modules
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Connect to the mongo DB
mongoose.connect('mongodb://localhost/microverse', {
    useMongoClient: true,
    /* other options */
});

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("We're succesfully connected!")
});

//define the schema and model
var eventSchema = new Schema({
    title: String,
    description: String,
    date: { type: Date, default: Date.now }
});

var event = mongoose.model('event', eventSchema);

module.exports = event;