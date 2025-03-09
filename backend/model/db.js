var mongoose = require('mongoose')
// const {v4: uuidv4} = require('uuid')
var Schema = mongoose.Schema
// require('dotenv').config()


var userSchema = new Schema({
    username: { type: String, unique: true, required: 'Username cannot be empty!' },
    fname: String,
    lname: String,
    pname: String,
    age: Number,
    pronouns: [String],   //check the type for this 
    identity: String,
    goal: String
})

var medicationSchema = new Schema({
    username: { type: String, unique: true, required: 'Username cannot be empty!' },
    name: String,
    description: String,
    amountpd: String,
    intakeFrequency: String,
    keyMol: String,
    intakeDosing: String
})

var chatHistorySchema = new Schema({
    userQuery: String,
    botResponse: String,
    timestamp: { type: Date, default: Date.now }
})

const User = mongoose.model('User', userSchema)
const Medication = mongoose.model('Medication', medicationSchema);
const ChatHistory = mongoose.model('ChatHistory', chatHistorySchema)


const initializeDB = () => {
    mongoose.connect(process.env.CONNECTION_SECRET)
        .then(() => console.log('Connected to MongoDB'))
        .catch(error => console.error('MongoDB connection error:', error));
}


module.exports = {
    User, Medication, ChatHistory, initializeDB
}
