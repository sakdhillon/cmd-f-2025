var mongoose = require('mongoose')
// const {v4: uuidv4} = require('uuid')
var Schema = mongoose.Schema
// require('dotenv').config()


var userSchema = new Schema({
    username: {type: String, unique: true, required: 'Username cannot be empty!'},
    fname: String,
    lname: String
})


const User = mongoose.model('User',userSchema)


const initializeDB = () => {
    mongoose.connect(process.env.CONNECTION_SECRET)
        .then(() => console.log('Connected to MongoDB'))
        .catch(error => console.error('MongoDB connection error:', error));
}


module.exports = {
    User,initializeDB
}
