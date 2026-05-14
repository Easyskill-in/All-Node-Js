const express = require('express');
const { CreatePost, getAllPost, setLike } = require('../Controller/Post.controller');
const router = express.Router();
// const UserModel = require('../Model/User.model');
// const PostModel = require('../Model/Post.model');

router.post('/create', CreatePost)
router.get('/all/:userId', getAllPost)
router.post('/likes/:postId', setLike)

module.exports = router;