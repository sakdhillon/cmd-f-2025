const express = require('express');
const router = express.Router(); 
const db = require('../model/db')

router.get('/', (req, res) => {
    res.json({ message: 'Profile route!' });
});

router.get('/info', async (req, res) => {
    let getUser = req.body.id
    let id = getUser

    //database query 
    await db.User.findOne(id).then(async (user,err) => {
        if(!err){
            console.log("cooolll")
            res.status(200).json(user)
        }
        else{
            res.status(404).json({message: "User could not be found!"})
        }
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

module.exports = router; 