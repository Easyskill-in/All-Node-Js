import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
    const nav = useNavigate();
    const [Post, setPost] = useState([]);

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