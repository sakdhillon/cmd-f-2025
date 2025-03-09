var mongoose = require('mongoose')
// const {v4: uuidv4} = require('uuid')
var Schema = mongoose.Schema
// require('dotenv').config()


var userSchema = new Schema({
    username: {type: String, unique: true, required: 'Username cannot be empty!'},
    fname: String,
    lname: String,
    pname: String,
    age: Number,
    pronouns: [String],   //check the type for this 
    identity: String,
    goal: String
})

var medicationSchema = new Schema({
    username: {type: String, unique: true, required: 'Username cannot be empty!'},
    name: String,
    description: String,
    amountpd: String,
    intakeFrequency: String,
    keyMol: String,
    intakeDosing: String
})


const User = mongoose.model('User',userSchema)
const Medication = mongoose.model('Medication', medicationSchema);


const initializeDB = () => {
    mongoose.connect(process.env.CONNECTION_SECRET)
        .then(() => console.log('Connected to MongoDB'))
        .catch(error => console.error('MongoDB connection error:', error));
}


module.exports = {
    User, Medication, initializeDB
}
