const express = require('express');
const path = require('path');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// function middleware(req, res, next) {
//     console.log("Middlware : ", req.url)
//     next()
//     // res.send("This is Middleware")
// }


// app.use(middleware)


app.use((req, res, next) => {
    console.log("middleware 1")
    next();
})
app.use((req, res, next) => {
    console.log("middleware 2")
    next();
})
app.use((req, res, next) => {
    console.log("middleware 3")
    next();
})

// Routes
app.get('/', (req, res) => {
    console.log("Normal Route : ", req.url)
    res.send('Server is running 🚀');
});
app.get('/About', (req, res) => {
    console.log("About Route : ", req.url)
    res.send('Server  About is running 🚀');
});


module.exports = app