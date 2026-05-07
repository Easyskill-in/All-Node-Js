const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const upload = require('../Middleware/multer.middleware');
const cloudinary = require('../Config/Cloudinary.js');

const app = express();


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.set("view engine", "ejs");

// Routes
app.get('/', (req, res) => {
    res.render('index');
});
app.get('/form', (req, res) => {
    res.render('form');
});


app.post("/submit", upload.single("file"), async (req, res) => {
    try {
        console.log(req.body)

        console.log(req.file)

        const result = await cloudinary.uploader.upload(req.file.path, {
            public_id: req.file.filename,
            folder: "Users",
            resource_type: "image"
        })

        fs.unlinkSync(req.file.path)

        console.log("\n\n Result", result.secure_url)
        res.json({
            sucess: true,
            message: "File uploaded successfully",
            file: req.file,
            result
        });

    } catch (error) {
        fs.unlinkSync(req.file.path)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
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


/*

PORT=3000
CLOUDINARY_CLOUD_NAME=dftpycrrm
CLOUDINARY_API_KEY=914971923319528
CLOUDINARY_API_SECRET=Lnbh0F8p27xuReJlgmzRFBi8ZVs

 */