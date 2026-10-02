const express = require('express')
const cors = require('cors');
const { WriteData, ReadData, DeleteData, UpdateData, FindById } = require('../database/Functions/index.js');

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

app.delete("/delete/:id", (req, res) => {
    console.log(req.params)

    DeleteData(Number(req.params.id))

    res.status(200).json({
        success: true,
        message: "Data Deleted Successfully...",
        data: req.params.id
    })

})

app.put("/update/:id", (req, res) => {
    const id = Number(req.params.id)
    const data = req.body;

    UpdateData(id, data)

    res.status(201).json({
        success: true,
        message: "Data Updated Successfully...",
        data: req.body
    })
})


app.get("/find/:id", (req, res) => {
    const id = Number(req.params.id)
    const data = FindById(id)

    if (!data) {
        return res.status(404).json({
            success: false,
            message: "Data Not Found...",
        })
    }

    res.status(200).json({
        success: true,
        message: "Data find Successfully...",
        data
    })
})

app.get("/find", (req, res) => {
    const id = Number(req.body.id)
    const data = FindById(id)

    if (!data) {
        return res.status(404).json({
            success: false,
            message: "Data Not Found...",
        })
    }

    res.status(200).json({
        success: true,
        message: "Data find Successfully...",
        data
    })
})

module.exports = app;