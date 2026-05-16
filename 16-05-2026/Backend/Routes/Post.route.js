const express = require('express');
const { CreatePost, getAllPost, setLike, getSinglePost, setComments } = require('../Controller/Post.controller');
const upload = require('../Middleware/multer.middleware');
const router = express.Router();
// const UserModel = require('../Model/User.model');
// const PostModel = require('../Model/Post.model');

router.post('/create', upload.single("file"), CreatePost)
router.get('/all/:userId', getAllPost)
router.post('/likes/:postId', setLike)
router.get('/getSinglePost/:postId/:userId', getSinglePost)
router.post('/comments/:postId/:userId', setComments)

module.exports = router;