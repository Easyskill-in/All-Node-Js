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


    useEffect(() => {
        async function getPost() {
            try {
                const res = await axios.get(
                    "http://localhost:3000/posts/all"
                );

                setPost(res.data.Data);
            } catch (error) {
                console.log("Error", error);
            }
        }

        getPost();
    }, []);


    async function handleLike(id) {
        try {
            console.log(id)
            setLike(p => !p)
            const res = await axios.post(`http://localhost:3000/posts/likes/${id}`, { userId: localStorage.getItem("userId") || 0 })

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
                                <p>{value.title}</p>
                            </div>

                            <div className="like">
                                <span>
                                    {/* <img src={Like} alt="" /> */}
                                    <img src={isLike ? Like : Unlike} alt="" onClick={() => {
                                        handleLike(value._id)
                                    }} />
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