const express = require('express');
const { CreatePost, getAllPost } = require('../Controller/Post.controller');
const router = express.Router();
// const UserModel = require('../Model/User.model');
// const PostModel = require('../Model/Post.model');

router.post('/create', CreatePost)
router.get('/all', getAllPost)

module.exports = router;