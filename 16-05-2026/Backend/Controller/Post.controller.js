const PostModel = require('../Model/Post.model');
const UserModel = require('../Model/User.model');

const cloudinary = require('../Config/Cloudinary.js');
const fs = require("fs")

async function CreatePost(req, res) {
    const { title, userId } = req.body;
    console.log(req.file)
    try {
        if (!title || !userId) {
            return res.status(400).json({ message: "Title and UserId are required" });
        }

        const resultPostImage = await cloudinary.uploader.upload(req.file.path, {
            folder: "Post Images",
            public_id: req.file.filename
        })

        fs.unlinkSync(req.file.path)

        const NewPost = new PostModel({
            title,
            user: userId,
            image: resultPostImage.secure_url
        })

        const result = await NewPost.save()

        return res.json({
            success: true,
            result
        })

    } catch (error) {
        fs.unlinkSync(req.file.path)
        res.status(500).json({ message: "Error creating post" });
    }
}

async function getAllPost(req, res) {
    const userId = req.params.userId;

    // console.log(userId)
    try {
        const Data = await PostModel
            .find()
            .populate("user", "name profile isLiked")
            .sort({ createdAt: -1 });

        // console.log(Data)

        const modifiedPosts = Data.map(post => {
            const isLikedByMe = post.likes.some(
                id => id.toString() === userId
            );

            return {
                _id: post._id,
                title: post.title,
                user: post.user,
                likesCount: post.likes.length,
                isLikedByMe,
                image: post.image,
                commentsCount: post.comments.length
            };
        });


        console.log(modifiedPosts)
        res.json({ success: true, Data: modifiedPosts });
    } catch (error) {
        res.status(500).json({ message: "Error creating post" });
    }
}


async function getSinglePost(req, res) {
    const postId = req.params.postId;
    const userId = req.params.userId;

    console.log(postId)
    try {
        const Post = await PostModel
            .findById(postId)
            .populate("user", "name profile isLiked")
            .populate("comments.userId", "name profile")
            .sort({ createdAt: -1 });


        console.log(Post)

        const modifiedPosts = () => {

            const isLikedByMe = Post.likes.some(
                id => id.toString() === userId)


            return {
                _id: Post._id,
                title: Post.title,
                user: Post.user,
                likesCount: Post.likes.length,
                isLikedByMe,
                image: Post.image,
                comments: Post.comments
            };

        }


        console.log(modifiedPosts())
        res.json({ success: true, Data: modifiedPosts() });
    } catch (error) {
        res.status(500).json({ message: "Error creating post" });
    }
}


async function setLike(req, res) {
    const { userId } = req.body;
    const { postId } = req.params;

    console.log({ userId, postId })
    try {

        const UserPost = await PostModel.findById(postId)
        const User = await UserModel.findById(userId)

        console.log(UserPost)
        if (!UserPost) {
            return res.json({
                success: false,
                message: "No Post Found..."
            })
        }
        if (!User) {
            return res.json({
                success: false,
                message: "No User Found..."
            })
        }

        const alreadyLiked = UserPost.likes.some((value) => {
            return value.toString() === userId.toString()
        })

        console.log({ alreadyLiked })

        if (alreadyLiked) {
            UserPost.likes = UserPost.likes.filter((value) => {
                return value.toString() !== userId.toString()
            })

        } else {
            UserPost.likes.push(userId)

        }

        const Res = await UserPost.save()

        res.json({
            success: true,
            message: alreadyLiked
                ? "Post unliked successfully"
                : "Post liked successfully",
            likesCount: UserPost.likes.length,
            data: UserPost
        })


    } catch (error) {
        res.status(500).json({ message: "Error creating post" });
    }
}

async function setComments(req, res) {
    const { userId } = req.params;
    const { postId } = req.params;

    const { comment } = req.body;

    console.log({ userId, postId, comment })
    try {

        const User = await UserModel.findById(userId)

        if (!User) {
            return res.status(404).json({
                success: false,
                message: "User Not Found"
            })
        }
        const Post = await PostModel.findById(postId)

        if (!Post) {
            return res.status(404).json({
                success: false,
                message: "Post Not Found"
            })
        }

        if (!comment) {
            return res.status(400).json({
                success: false,
                message: "comment is required"
            })
        }

        Post.comments.push({ userId, comment })

        const result = await Post.save()
        res.json({
            success: true,
            message: "Comment added successfully",
            result
        })

    } catch (error) {
        res.status(500).json({ message: "Error creating post" });
    }
}

module.exports = { CreatePost, getAllPost, setLike, getSinglePost, setComments }