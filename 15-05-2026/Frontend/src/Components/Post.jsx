import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Post = () => {
    const nav = useNavigate()
    const [Title, setTitle] = useState("")
    const [File, setFile] = useState()
    return (
        <div>
            <form style={{ padding: "20px" }} onSubmit={(e) => {
                e.preventDefault();
                async function POSTData() {
                    try {

                        const formData = new FormData()
                        formData.append("title", Title)
                        formData.append("file", File)
                        formData.append("userId", localStorage.getItem("userId") || 0)

                        console.log(Title)
                        const res = await axios.post("http://localhost:3000/posts/create", formData)

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
                <br />
                <input type="file" name='file'
                    onChange={(e) => {
                        setFile(e.target.files[0])
                    }} />
                <br />

                <button type='Submit'>Post</button>
            </form>
        </div >
    )
}

export default Post
