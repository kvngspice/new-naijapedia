const express = require('express');
const router = express.Router();
const unVettedTerm = require('./models/term_unvetted');

router.post('/terms/vet', async (req, res) => {
  const { body } = req;
  const { 
    term_name, 
    definition, 
    example
  } = body;

  const newUnVettedTerm = new unVettedTerm({
    term_name,
    definition,
    example
  });
  
  const savedUnVettedTerm = await newUnVettedTerm.save();
  console.log('saved', savedUnVettedTerm)
  res.json(savedUnVettedTerm);
});

module.exports = router;