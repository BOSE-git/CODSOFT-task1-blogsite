import React, { useState, useEffect } from 'react'
import './BlogPage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from "./helper";


const BlogPage = () => {
    const [blogData, setBlogData] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${BASE_URL}/api/temporaryData`)
            .then(response => {
                setBlogData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data from backend', error);
            });

        // Fetch comments related to the blog
        if (blogData.id) {
            axios.get(`${BASE_URL}/api/comments/blog/${blogData.id}`)
                .then(response => {
                    setComments(response.data.comments);
                })
                .catch(error => {
                    console.error('Error fetching comments from backend', error);
                });
        }
    }, [blogData.id]);

    const handleCommentSubmit = async (event) => {
        event.preventDefault();
        await axios.post(`${BASE_URL}/api/comments/add`, {
            name: localStorage.getItem("userName"),
            content: newComment,
            blog: blogData.id,
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Fetch updated comments
        await axios.get(`${BASE_URL}/api/comments/blog/${blogData.id}`)
            .then(response => {
                setComments(response.data.comments);
            })
            .catch(error => {
                console.error('Error fetching comments from backend', error);
            });

        setNewComment('');
    };


    console.log("Data", blogData.id);

    return (
        <div className="with-comments">
            <div className="blogPage-container">
                <div className="outline-container">
                    <div className="blog-title">{blogData.title}</div>
                    <div className="user-name">{blogData.userName}</div>
                    <img src={blogData.imageUrl} alt={blogData.title} className="blog-image" />
                    <div className="blog-description">{blogData.description}</div>
                </div>
            </div>
            <div className="comments-section">
                <h2>Comments</h2>
                <form onSubmit={handleCommentSubmit} className='comment-form'>
                    <textarea
                        value={newComment}
                        onChange={(event) => setNewComment(event.target.value)}
                        placeholder="Add a comment..."
                    />
                    <button className='comment-button' type="submit">Submit Comment</button>
                </form>
            </div>
            <div className="comment-list-container">
                <div className="comment-list">
                    {comments.map(comment => (
                        <div key={comment._id} className="comment-item">
                            <div className="comment-user-name">{comment.name}:</div>
                            <div className="comment-content">{comment.content}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default BlogPage