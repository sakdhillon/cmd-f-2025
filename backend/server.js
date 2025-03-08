const express = require('express');
const http = require('http');
let app = express();

// to allow for static files - like images
app.use(express.static('public'));

// initializing the database
const db = require('./model/db.js');

// to allow for dynamic pages
const server = http.createServer(app);
server.listen(process.env.PORT, () =>{
    console.log("Server is running on specified port")
}).on('error', (err) => {
    console.error('Error starting the server:', err);
});