const mongoose = require("mongoose")



const CommentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    comment: {
        type: String,
        require: true
    }
}, { timestamps: true })


module.exports = CommentSchema