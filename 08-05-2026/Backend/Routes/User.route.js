const express = require('express');
const { registerUser, loginUser } = require('../Controller/User.controller');
const upload = require('../Middleware/multer.middleware');
const router = express.Router();
// const UserModel = require('../Model/User.model');
// const PostModel = require('../Model/Post.model');

router.post('/register', upload.single("file"), registerUser)
router.post('/login', loginUser)




module.exports = router;