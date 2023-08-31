import React, { useState } from "react";
import './AddBlog.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "./helper";

const AddBlog = () => {
  const [input, setInput] = useState({
    title:"",description:"",imageUrl:""
  })

  const navigate = useNavigate();

  const sendRequest = async () => {
    const res = await axios
      .post(`${BASE_URL}/api/blog/add`,{
        title: input.title,
        description: input.description,
        image: input.imageUrl,
        user: localStorage.getItem("userId") 
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };


  function handleChange(ev){
    setInput((prevState) => ({
      ...prevState,
      [ev.target.name]: ev.target.value,
    }));
  }
  function handleSubmit(ev){
    ev.preventDefault();
    sendRequest().then(() => navigate("/myBlogs"));
  }

  return (
    <div className="addblog-container">
      <div className="addblog-outline">
        <h1>Add your Blog!</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder='Title' name='title' value={input.title} onChange={handleChange} />
          <input id="descBLOG" type="text" placeholder='Description' name='description' value={input.description} onChange={handleChange}/>
          <input type="text" placeholder='Image URL' name='imageUrl' value={input.imageUrl} onChange={handleChange}/>
          <input type="submit" className='blog-add-button' value={"Post"} />
        </form>
      </div>
    </div>
  )
}

export default AddBlog