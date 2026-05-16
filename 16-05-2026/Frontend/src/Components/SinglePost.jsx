import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Like from '../assets/Images/like.png'
import Unlike from '../assets/Images/unlike.png'
import CommentIcon from '../assets/Images/comment.png'


const SinglePost = () => {
    const { id } = useParams()
    console.log("ID ", id)

    const [Post, setPost] = useState({})
    const [Comment, setComment] = useState([])
    const [Loading, setLoading] = useState(false)

    useEffect(() => {
        async function fn() {
            setLoading(true)
            try {
                const res = await axios.get(`http://localhost:3000/posts/getSinglePost/${id}/${localStorage.getItem('userId') || 0}`)
                console.log("Data : ", res.data.Data)

                // setPost()
                setPost(res.data.Data)
                setComment(res.data?.Data?.comments || [])
            } catch (error) {
                console.error("Error Aayi Hai : ", error)
            } finally {
                setLoading(false)
            }
        }

        fn()


    }, [])


    if (Loading) {
        return <h1>Loading....</h1>
    }
    return (
        <div>
            <h1>Single Post</h1>
            <hr />
            <div className="post-card" key={Post._id}>

                <div className="side">
                    <img
                        src={Post.user?.profile || "Test"}
                        alt="profile"
                    />

                    <span>{Post.user?.name || "No Name"}</span>
                </div>

                <div className="post">
                    {Post.image ? <img src={Post.image} alt="Post Image" /> : ""}

                    <p className="post-text">{Post.title}</p>
                </div>

                <div className="like">
                    <span>
                        <div className="like-area">

                            {/* <img src={Like} alt="" /> */}
                            <img src={Post.isLikedByMe ? Like : Unlike} alt="likes" onClick={() => {
                                setLike(x => !x)
                                handleLike(Post._id)
                                // window.location.reload()
                            }} />
                            {Post.likesCount
                            }
                        </div>
                        <div className="comment-area">
                            <img src={CommentIcon || "Test"} alt="comments" />
                            {Post.commentsCount}
                        </div>
                    </span>
                </div>
            </div>
            <hr />
            <div className="all-comments">
                {
                    Comment ?
                        (

                            Comment.map((value, index) => (
                                <div className="comment-card" key={index}>
                                    <div className="side">
                                        <img
                                            src={value.userId?.profile || "Test"}
                                            alt="profile"
                                        />
                                        <span>{value.userId?.name || "No Name"}</span>
                                    </div>
                                    <div className="comment">

                                        <p className="comment-text">{value.comment}</p>
                                    </div>
                                </div>
                            ))

                        )
                        :
                        (<h1>No Comments Yes</h1>)

                }
            </div>
        </div >
    )
}

export default SinglePost
