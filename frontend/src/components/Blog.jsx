import React from 'react'
import './Blog.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import LaunchIcon from '@mui/icons-material/Launch';
import { BASE_URL } from "./helper";


const Blog = ({title, description, imageUrl, userName, isUser, id}) => {

  const navigate = useNavigate();
  function handleEdit(ev){
    navigate(`/myblogs/${id}`)
  }

  const deleteRequest = async () => {
    const res = await axios.delete(`${BASE_URL}/api/blog/${id}`).catch((err) => console.log(err));
    const data =  await res.data;
  }

  function handleDelete(ev){
      deleteRequest().then(() => navigate("/")).then(() => navigate("/myBlogs"));
  }

  async function toBlogPage() {
    const data = {
      id,
      userName,
      title,
      description,
      imageUrl,
    };
  
    await axios.post(`${BASE_URL}/api/temporaryData`, data);
  
    navigate('/blogPage')
  }

  const descriptionWords = description.split(' ');
  const truncatedDescription = descriptionWords.slice(0, 25).join(' ');

  return (
    <div className="blog-card">
        <div className="image"><img src={imageUrl} alt={title} /></div>
        <div className="user-name">{userName}</div>
        <div className="blog-text">
            <div className="title">{title}</div>
            <div className="desc">{truncatedDescription}...</div>
        </div>
        {isUser && <div className="edit-delete-buttons">
            <button className="edit-icon" onClick={handleEdit}><EditIcon fontSize='small' /></button>
            <button  className="delete-icon" onClick={handleDelete}><DeleteIcon fontSize='small'/></button>
        </div>}
        <button onClick={toBlogPage}><div className="showmore"><LaunchIcon fontSize='medium'/></div></button>
    </div>
  )
}

export default Blog