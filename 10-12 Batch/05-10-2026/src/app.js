const express = require("express")
const app = express()

app.get("/", (req, res) => {
    res.send("Success...")
})

app.get("/about", (req, res) => {
    res.send("About Page")
})

app.get("/greet/:name", (req, res) => {
    console.log(req.params)
    res.send("Hello " + req.params.name)
})

app.get("/data", (req, res) => {
    console.log(req.params)
    console.log(req.query)
    res.send("Hello")
})
// app.get("/greet/username", (req, res) => {
//     res.send("Hello Username")
// })



module.exports = app;