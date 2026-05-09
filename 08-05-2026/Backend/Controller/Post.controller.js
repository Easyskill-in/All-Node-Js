const PostModel = require('../Model/Post.model');
async function CreatePost(req, res) {
    const { title, userId } = req.body;
    try {
        if (!title || !userId) {
            return res.status(400).json({ message: "Title and UserId are required" });
        }

        const NewPost = new PostModel({
            title,
            user: userId
        })

        const result = await NewPost.save()

        return res.json({
            success: true,
            result
        })

    } catch (error) {
        res.status(500).json({ message: "Error creating post" });
    }
}

async function getAllPost(req, res) {

    try {


        const Data = await PostModel
        .find()
        .populate("user", "name profile")
        .sort({ createdAt: -1 });

        return res.json({
            success: true,
            Data
        })

    } catch (error) {
        res.status(500).json({ message: "Error creating post" });
    }
}

module.exports = { CreatePost, getAllPost }