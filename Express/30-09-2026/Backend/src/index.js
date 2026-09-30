const express = require('express')
const cors = require('cors');
const { WriteData, ReadData } = require('../database/Functions/index.js');

const app = express();

// Middleware
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.send('Server is running 🚀');
});


app.post("/submit", (req, res) => {
    const data = req.body;

    console.log({ data })
    const ans = WriteData(data)

    res.status(201).json({
        success: true,
        message: "task added..",
        data: ans
    })

})
app.get("/all", (req, res) => {


    const ans = ReadData()

    res.status(200).json({
        success: true,
        message: "task fetched successfully...",
        data: ans
    })

})

module.exports = app;