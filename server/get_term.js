const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Term = require('./models/term');

router.get('/terms/:id', (req, res, next) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send('Invalid term ID');
  }

  Term.findById(id)
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

module.exports = router;
