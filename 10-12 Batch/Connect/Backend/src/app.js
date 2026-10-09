const express = require('express');
const path = require('path');
const { DATABASE_NAME } = require('./Config/Config');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    console.log(DATABASE_NAME)
    res.send('Server is running 🚀');
});


module.exports = app
