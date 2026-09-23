const express = require("express")
const { setData } = require("./database/db.js")

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    setData({
        id: Date.now(), time: new Date().toLocaleString(),
        method: req.method, url: req.url
    })
    res.send("Hello")
})

app.get("/name/:username", (req, res) => {
    console.log(req.params.username)
    setData({
        id: Date.now(), time: new Date().toLocaleString(),
        method: req.method, url: req.url, name: req.params.username
    })
    res.send("Hello " + req.params.username)
})


app.post("/", (req, res) => {
    console.log(req.body)
    res.json({
        success: true,
        data: req.body
    })
})



module.exports = app