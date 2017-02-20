const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const homeworkSchema = new Schema({
  homework:String,
  stack:String
});

module.exports = mongoose.model('Homework', homeworkSchema);
