const express = require('express');
const router = express.Router();
const Term = require('./models/term');

router.get('/terms', async (req, res) => {
    try {
        Term.find()
            .then((terms) => {
                //console.log('All the terms:', terms);
                res.status(200).send({
                    terms
                })
            })
            .catch((err) => {
                console.error('Error getting the terms', err);
            });
    } catch {

    }
});

module.exports = router;