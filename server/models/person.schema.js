var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create the Schema
var personSchema = new Schema({
    name: {type: String, required: true, unique: true},
    location: {type: String},
    dateOfBirth: {type: Date},
    internetPts: {type: Number, default: 1000}
});

// export our model
module.exports = mongoose.model('Person', personSchema);