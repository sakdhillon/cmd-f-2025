const express = require('express');
const router = express.Router(); 
const db = require ("../model/db");


router.get('/', (req, res) => {
    res.json({ message: 'signup route!' });
});

// LOGINN
router.post('/login', (req,res) => {
    req.session.cookie.expires = expirationDate
    req.session.save()
    res.status(200).json({userId: req.user._id, sessionId: req.session.id})
})

router.get('/getuser', async (req, res) => {
    let getUser = req.body.id
    let id = getUser

    //database query 
    await db.User.findOne(id).then(async (user,err) => {
        if(!err){
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


// REGISTRATION 
// one post request and thats it? - take to login page 

//

module.exports = router; 