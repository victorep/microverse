//Load mongoose modules
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
mongoose.Promise = global.Promise;
// Define your schema as normal.
var userSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, index: true, unique: true, required: true },
    password: { type: String, required: true },
    fullName: String
});

var user = mongoose.model('user', userSchema);

module.exports = user;