const express = require('express');
const http = require('http');
const cors = require('cors');
require('dotenv').config();
let app = express();

// to allow for static files - like images
app.use(express.static('public'));
app.use(cors({
    origin: '*', 
    methods: 'GET,POST', 
}));

//testing connection
app.get('/page', (req, res) => {
    res.json({ message: 'Hello from the backend!' });
});

const profile = require('./Profile/profile');
app.use('/profile', profile);

const meds = require('./Meds/meds');
app.use('/meds', meds);

const tracker = require('./Tracker/tracker');
app.use('/tracker', tracker);


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
server.listen(process.env.PORT, () =>{
    console.log(`Server is running on specified port`);
}).on('error', (err) => {
    console.error('Error starting the server:', err);
});