const express = require('express');
const router = express.Router();
const db = require("../model/db");
var mongoose = require('mongoose');

router.get('/', (req, res) => {
    res.json({ message: 'data route!' });
});

router.post('/data', (req, res) => {
    let newUser = {
        username: "aLove",
        fname: "Ada",
        lname: "Lovelace",
        pname: "Ada",
        age: 28,
        email: "ada.lovelace@gmail.com",
        pronouns: "she/her",
        identity: "bisexual",
        goal: "To feel comfortable with her identity"
    };

    db.User.create(newUser)  
        .then(result => {
            console.table(result);
            res.status(200).json("Done!");
        })
        .catch(err => {
            console.log(err);
            res.status(500).json("Error!");
        });
});


module.exports = router; 
