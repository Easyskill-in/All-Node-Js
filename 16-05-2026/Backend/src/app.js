const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const upload = require('../Middleware/multer.middleware');
const cloudinary = require('../Config/Cloudinary.js');


const UserRoute = require('../Routes/User.route');
const PostRoute = require('../Routes/Post.route');

const app = express();


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use('/users', UserRoute);
app.use('/posts', PostRoute);

app.get('/', (req, res) => {
    res.send("Welcome to the Instagram API");
})

module.exports = app;


/*

PORT=3000
CLOUDINARY_CLOUD_NAME=dftpycrrm
CLOUDINARY_API_KEY=914971923319528
CLOUDINARY_API_SECRET=Lnbh0F8p27xuReJlgmzRFBi8ZVs

 */