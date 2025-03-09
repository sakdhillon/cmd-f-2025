const express = require('express');
const router = express.Router();
const db = require("../model/db")

router.get('/', (req, res) => {
    res.json({ message: 'AddMeds route!' });
});


// get request - only for the one that we are editing
router.get('/edit', async (req, res) => {
    let getUser = req.query.userID
    let med = req.query.med

    //database query 
    await db.Medication.find({
        username: getUser,
        name: med
    }).then(async (medication, err) => {
        if (!err) {
            res.status(200).json(medication)
        }
        else {
            res.status(404).json({ message: "Medication could not be found!" })
        }
    })
        .catch(err => {
            res.status(500).json(err)
        })
})

// for the medication that we are editing 
router.put('/pedit', async (req, res) => {
    try {
        const username = "aLove";
        const { name, description, amountpd, intakeFrequency, keyMol, intakeDosing } = req.body;

        const updateMed = await db.Medication.findOneAndUpdate(
            { name: name, username: username },
            {
                description: description,
                amountpd: amountpd,
                intakeFrequency: intakeFrequency,
                keyMol: keyMol,
                intakeDosing: intakeDosing
            },
            { new: true }
        );

        console.log("updateMed == ", updateMed);

        if (!updateMed) {
            return res.status(404).json({ message: "Medication not found!" });
        }

        res.status(200).json({ message: "Medication Updated!", data: updateMed });
    } catch (err) {
        res.status(500).json(err);
    }
});

// new medication adding
router.post('/add', async (req, res) => {
    try {
        const username = 'aLove'; //hardcoded - need to change 
        const { name, description, amountpd, intakeFrequency, keyMol, intakeDosing } = req.body;

        if (!username || !name) {
            return res.status(400).json({ message: "Username and medication name are required!" });
        }

        const newMedication = new db.Medication({
            username,
            name,
            description,
            amountpd,
            intakeFrequency,
            keyMol,
            intakeDosing
        });

        await db.Medication.insertOne(newMedication);

        await newMedication.save();

        res.status(201).json({ message: "Medication added successfully!", data: newMedication });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }

})

// delete medication 
router.delete('/delete', async (req, res) => {
    try {
        const id = req.body.id;
        const username = "aLove";
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: "Medication name is required!" });
        }

        const deletedMed = await db.Medication.findOneAndDelete({ _id: id, username, name });

        if (deletedMed) {
            return res.status(200).json({ message: "Deleted medication successfully!" });
        } else {
            return res.status(404).json({ message: "Medication not found, nothing deleted." });
        }

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error", error: err });
    }
});

module.exports = router; 