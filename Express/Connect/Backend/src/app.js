const express = require('express');
const path = require('path');
const cors = require('cors');
const { FRONTEND_URL } = require('./Config/Config');

require("dotenv").config()

const app = express();

app.use(cors({
    origin: FRONTEND_URL
}))

// app.use(cors())//api
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// console.log(process.env.PORT)
// console.log(process.env.HOSTNAME)

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "React Connected Successfully..."
    })
})


app.use((req, res) => {
    res.sendFile(path.join(__dirname, "Views", "index.html"))
})

module.exports = app