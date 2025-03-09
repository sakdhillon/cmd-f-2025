const express = require('express');
const http = require('http');
var mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
let app = express();
// app.options('*', cors())

app.use(express.json());

// to allow for static files - like images
app.use(express.static('public'));
app.use(cors({
    origin: '*',
    methods: 'GET,POST,DELETE,PUT',
}));

//testing connection
app.get('/page', (req, res) => {
    res.json({ message: 'Hello from the backend!' });
});

const profile = require('./Profile/profile');
app.use('/profile', profile);

const signup = require('./Signup/user');
app.use('/user', signup);

const chat = require('./Chat/chat');
app.use('/chat', chat);

const addmeds = require('./AddMeds/addmeds');
app.use('/addmeds', addmeds);

const tracker = require('./Tracker/tracker');
app.use('/tracker', tracker);


// const Data = require('./Data/data')
// app.use('/data', Data)


// initializing the database
const MongoStore = require('connect-mongo')
const { initializeDB } = require('./model/db.js');
initializeDB();

const session = require('express-session');
app.use(session({
    secret: process.env.SESSION_SECRET || 'randomSecretKeyForNow',
    resave: false,
    saveUninitialized: true,
    httpOnly: false,
    store: MongoStore.create({
        mongoUrl: process.env.CONNECTION_SECRET,
        maxAge: 3600000,
    })
}))

// to allow for dynamic pages
const server = http.createServer(app);
server.listen(process.env.PORT, () => {
    console.log(`Server is running on specified port`);
}).on('error', (err) => {
    console.error('Error starting the server:', err);
});