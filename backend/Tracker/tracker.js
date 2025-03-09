const express = require('express');
const router = express.Router();
const db = require('../model/db');

router.get('/', (req, res) => {
    res.json({ message: 'Tracker route!' });
});

router.get('/allmeds', async (req, res) => {
    let getUser = req.body.id

    await db.Medication.find(getUser).then(async (addmeds, err) => {
        if (!err) {
            res.status(200).json(addmeds)
        }
        else {
            res.status(404).json({ message: "User could not be found!" })
        }
    })
        .catch(err => {
            res.status(500).json(err)
        })
})

module.exports = router; 