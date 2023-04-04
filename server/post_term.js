const express = require('express');
const router = express.Router();
const Term = require('./models/term');

router.post('/terms', async (req, res) => {
  try {
    const { term_name, definition, example } = req.body;
    const newTerm = new Term({
      term_name,
      definition,
      example
    });
    const savedTerm = await newTerm.save();
    console.log('saved', savedTerm)
    res.json(savedTerm);
  } catch (err) {
    console.error('Error creating new term', err);
    res.status(500).send('Error creating new term');
  }
});

module.exports = router;
