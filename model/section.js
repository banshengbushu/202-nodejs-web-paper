const mongoose = require('mongoose');
const Schema = mongoose.model;

const sectionSchema = new Schema({
  title: String,
  homeworks: [
    {
      type: Schema.ObjectId,
      ref: 'Homework'
    }
  ],
  paper: [
    {
      type: ObjectId,
      ref: 'Paper'
    }
  ]
});

module.exports = mongoose.model('Section', sectionSchema);