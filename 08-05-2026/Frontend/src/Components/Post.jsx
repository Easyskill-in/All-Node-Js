import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Post = () => {
    const nav = useNavigate()
    const [Title, setTitle] = useState("")
    return (
        <div>
            <form onSubmit={(e) => {
                e.preventDefault();
                async function POSTData() {
                    try {
                        console.log(Title)
                        const res = await axios.post("http://localhost:3000/posts/create", { title: Title, userId: localStorage.getItem("userId") || 0 })

                        console.log(res.data)

                        setTitle("")
                        nav("/")
                    } catch (error) {
                        console.log("Error", error)
                    }
                }   
                POSTData()
            }}>
                <input type="text" name='post' value={Title} onChange={(e) => {
                    setTitle(e.target.value)
                }} />

                <button type='Submit'>Post</button>
            </form>
        </div>
    )
}

export default Post
