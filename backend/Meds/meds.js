const express = require('express');
const router = express.Router(); 
const db = require("../model/db")

router.get('/', (req, res) => {
    res.json({ message: 'Meds route!' });
});


// get request - only for the one that we are editing
router.get('/meds/edit', async (req, res) => {
    let getUser = req.query.userID 
    let med = req.query.med

    //database query 
    await db.Medication.find({
        username: getUser,
        name: med}).then(async (medication, err) => {
            if (!err){
                res.status(200).json(medication)
            }
            else{
                res.status(404).json({message: "Medication could not be found!"})
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

// for the medication that we are editing 
router.post('/meds/edit', async (req, res) => {
    try {
        const { userID, med } = req.body;
        const { inputData } = req.body;

        if (!inputData){
            return res.status(400).json({ message: "The new change is empty!"})
        }
        const updateMed = await db.Medication.findByIdAndUpdate(
            { username: userID, name: med },
            { $set: inputData },
            { new: true }
        );

        if (!updateMed){
            return res.status(404).json({ message: "Medication not found!" });
        }
        res.status(200).json({ message: "Medication Updated!", data: updatedMed });
    }
    catch (error) {
        res.status(500).json(error);
    }

})

//new medication adding
// router.post('/meds/add', async (req, res) => {

// })

module.exports = router; 