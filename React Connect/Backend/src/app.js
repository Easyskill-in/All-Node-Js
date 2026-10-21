const express = require('express');
const cors = require('cors');
const { FRONTEND_URL } = require('./Config/env');


const app = express();

// Middleware
app.use(cors({
    origin: FRONTEND_URL
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: "Hello From NodeJs"
    })
});

app.post("/submit", (req, res) => {
    res.json({
        success: true,
        message: "Hello From NodeJs",
        data: req.body
    })
})

module.exports = app