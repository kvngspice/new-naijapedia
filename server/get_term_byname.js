const express = require('express');
const router = express.Router();
const Term = require('./models/term');


router.get('/terms/termname/:term_name', (req, res, next) => {
  const termName = req.params.term_name;

  Term.findOne({ term_name: termName })
    .then((term) => {
      if (!term) {
        return res.status(404).send('Term not found');
      }
      res.send(term);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Server error');
    });
});

/**
 // Find all terms that contain the string "example" in their term_name
Term.find({ term_name: /example/ })
  .then((terms) => {
    console.log('All the terms containing "example":', terms);
  })
  .catch((err) => {
    console.error('Error getting the terms', err);
  });
 */

module.exports = router;
