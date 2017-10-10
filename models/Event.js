//Load mongoose modules
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


//define the schema and model
var eventSchema = new Schema({
    title: String,
    description: String,
    date: { type: Date, default: Date.now }
});

var event = mongoose.model('event', eventSchema);

module.exports = event;