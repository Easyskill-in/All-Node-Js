import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import Like from '../assets/Images/like.png'
import Unlike from '../assets/Images/unlike.png'


const HomePage = () => {
    const nav = useNavigate();
    const [Post, setPost] = useState([]);
    const [isLike, setLike] = useState(false);

    if (!localStorage.getItem("isLogin")) {
        nav("/login")
    }
    useEffect(() => {
        async function getPost() {
            try {
                const res = await axios.get(
                    "http://localhost:3000/posts/all/" + localStorage.getItem("userId"));

                setPost(res.data.Data);

                console.log(res.data)
            } catch (error) {
                console.log("Error", error);
            }
        }


        getPost();

        setLike(x => !x)



    }, [isLike]);


    async function handleLike(id) {
        try {
            console.log(id)
            setLike(p => !p)
            const res = await axios.post(`http://localhost:3000/posts/likes/${id}`, { userId: localStorage.getItem("userId") || 0 })
            // setPost(Post)

            setPost((prevPosts) =>
                prevPosts.map((post) => {
                    if (post._id === id) {
                        return {
                            ...post,
                            isLikedByMe: !post.isLikedByMe,
                            likesCount: post.isLikedByMe
                                ? post.likesCount - 1
                                : post.likesCount + 1,
                        };
                    }
                    return post;
                }));


            console.log(res)
        } catch (error) {
            console.log("Like Error : ", error)
        }
    }

    return (
        <div className="home-container">

            {/* Top Bar */}

            <div className="top-bar">
                <h1 className="page-title">All Posts</h1>

                <button
                    className="create-btn"
                    onClick={() => {
                        nav("/create-post");
                    }}
                >
                    + Create Post
                </button>
            </div>

            {/* Posts */}

            <div className="posts-container">
                {Post.length > 0 ? (
                    Post.map((value, index) => (
                        <div className="post-card" key={index}>

                            <div className="side">
                                <img
                                    src={value.user.profile}
                                    alt="profile"
                                />

                                <span>{value.user.name}</span>
                            </div>

                            <div className="post">
                                {value.image ? <img src={value.image} alt="Post Image" /> : ""}

                                <p className="post-text">{value.title}</p>
                            </div>

                            <div className="like">
                                <span>
                                    {/* <img src={Like} alt="" /> */}
                                    <img src={value.isLikedByMe ? Like : Unlike} alt="likes" onClick={() => {
                                        setLike(x => !x)
                                        handleLike(value._id)
                                        // window.location.reload()
                                    }} />
                                    {value.likesCount
                                    }
                                </span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="empty-posts">
                        <h2>No Posts Yet</h2>
                        <p>Create your first post now 🚀</p>
                    </div>
                )}
            </div>
        </div>


    );
};

export default HomePage;