const mongoose = require('mongoose');

const unVettedTermSchema = new mongoose.Schema({
  term_name: {
    type: String,
    required: true,
    unique: true
  },
  definition: {
    type: String,
    required: false
  },
  example: {
    type: String,
    required: false
  }
});

const unVettedTerm = mongoose.model('unVettedTerm', unVettedTermSchema);

module.exports = unVettedTerm;