const express = require('express');
const path = require('path');
const upload = require('../Middleware/multer.middleware');

const app = express();


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.set("view engine", "ejs");

// Routes
app.get('/', (req, res) => {
    res.render('index');
});
app.get('/form', (req, res) => {
    res.render('form');
});


app.post("/submit", upload.array("file", 3), (req, res) => {
    console.log(req.body)
    res.json({
        sucess: true,
        message: "File uploaded successfully",
        files: req.files
    });
})
// app.post("/submit", upload.single("file"), (req, res) => {
//     console.log(req.body)
//     res.json({
//         sucess: true,
//         message: "File uploaded successfully",
//         file: req.file
//     });
// })

module.exports = app;