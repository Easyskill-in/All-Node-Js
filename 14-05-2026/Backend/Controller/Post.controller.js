const PostModel = require('../Model/Post.model');
const UserModel = require('../Model/User.model');
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
                isLikedByMe
            };
        });


        console.log(modifiedPosts)
        res.json({ success: true, Data: modifiedPosts });
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

module.exports = { CreatePost, getAllPost, setLike }