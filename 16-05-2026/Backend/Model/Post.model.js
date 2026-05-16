const mongoose = require('mongoose');
const CommentSchema = require('./Comment.model');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],

    comments: [CommentSchema]

}, { timestamps: true })

const PostModel = mongoose.model('Post', PostSchema);

module.exports = PostModel;