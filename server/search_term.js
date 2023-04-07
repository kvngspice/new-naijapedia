const express = require('express');
const router = express.Router();
const Term = require('./models/term');


router.get('/search', async (req, res) => {
  const { phrase } = req.query;

  if (!phrase) {
    return res.status(400).json({ error: 'Missing query parameter: phrase' });
  }

  try {
    // Escape any special characters in the phrase
    const escapedPhrase = phrase.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    const regex = new RegExp(escapedPhrase, 'i');
    const results = await Term.find({ term_name: regex });
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;