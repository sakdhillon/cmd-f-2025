const express = require('express');
const router = express.Router();
const db = require("../model/db");


router.get('/', (req, res) => {
    res.json({ message: 'signup route!' });
});

// LOGINN
router.post('/login', (req, res) => {
    req.session.cookie.expires = expirationDate
    req.session.save()
    res.status(200).json({ userId: req.user._id, sessionId: req.session.id })
})

router.get('/getuser', async (req, res) => {
    let getUser = req.body.id
    let id = getUser

    //database query 
    await db.User.findOne(id).then(async (user, err) => {
        if (!err) {
            res.status(200).json(user)
        }
        else {
            res.status(404).json({ message: "User could not be found!" })
        }
    })
        .catch(err => {
            res.status(500).json(err)
        })
})


// REGISTRATION 
// one post request and thats it? - take to login page 
router.post('/signup', async (req, res) => {
    try {
        const { username, fname, lname, pname, age, pronouns, identity, goal } = req.body;

        if (!username) {
            return res.status(400).json({ message: 'Username is required.' });
        }

        // checking username
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists.' });
        }

        const newUser = new User({
            username,
            fname,
            lname,
            pname,
            age,
            pronouns,
            identity,
            goal
        });

        await newUser.save();

        res.status(200).json({ message: 'User created successfully' });

    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});
//

module.exports = router; 