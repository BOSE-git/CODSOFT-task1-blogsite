import React, { useEffect, useState } from 'react'
import './BlogDetail.css';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import { BASE_URL } from "./helper";

const BlogDetail = () => {
  const id = useParams().id;
  const [blog, setBlog] = useState();
  const navigate = useNavigate();

  const [input, setInput] = useState({});


  const fetchDetails = async () => {
    const res = await axios.get(`${BASE_URL}/api/blog/${id}`).catch((err) => console.log(err));
    const data = await res.data;
    return data;
  }


  useEffect(() => {
    fetchDetails().then((data) => {
                  setBlog(data.blog)
                  setInput({title: data.blog.title,
                            description: data.blog.description})
                             });
  },[id])

  async function sendRequest(){
    const res = await axios.put(`${BASE_URL}/api/blog/update/${id}`,{
      title: input.title,
      description: input.description,
    }).catch(err => console.log(err));

    const data = await res.data;
    return data;
  }

  function handleChange(ev){
    setInput((prevState) => ({
      ...prevState,
      [ev.target.name]: ev.target.value,
    }));
  }

  function handleSubmit(ev){
    ev.preventDefault();
    console.log(input);
    sendRequest().then((data) => console.log(data)).then(() => navigate("/myBlogs"));
  }



  console.log(blog);
  return (
    <div className="addblog-container">
      <div className="addblog-outline">
        <h1>Edit your Blog!</h1>
        {input && <form onSubmit={handleSubmit}>
          <input type="text" placeholder='Title' name='title' value={input.title} onChange={handleChange} />
          <input id="descBLOG" type="text" placeholder='Description' name='description' value={input.description} onChange={handleChange}/>
          <input type="submit" className='blog-add-button' value={"Post"} />
        </form>}
      </div>
    </div>
  )
}

export default BlogDetail