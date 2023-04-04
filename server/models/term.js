const mongoose = require('mongoose');

const termSchema = new mongoose.Schema({
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

const Term = mongoose.model('Term', termSchema);

module.exports = Term;