import React, { useEffect, useState } from 'react';
import './Blogs.css';
import Blog from './Blog';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import { BASE_URL } from "./helper";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState([]); // Add state for filtered blogs

  const sendRequest = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/blog`);
      const data = res.data;
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    sendRequest().then((data) => {
      setBlogs(data.blogs);
      setFilteredBlogs(data.blogs); // Initialize filteredBlogs with all blogs
    });
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = () => {
    const filteredBlogs = blogs.filter((blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBlogs(filteredBlogs); // Update filteredBlogs on search icon click
  };

  return (
    <div className="blog-container-search">
      <div className="search-bar">
        <div className="search-outline">
          <input
            className='search-input'
            type="text"
            placeholder="Search.."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <div className="search-button" onClick={handleSearchClick}> {/* Add onClick handler */}
            <SearchIcon />
          </div>
        </div>
      </div>
      <div className="blog-container">
        {filteredBlogs.map((blog, index) => (
          <Blog
            key={blog._id}
            id={blog._id}
            isUser={localStorage.getItem("user") === blog.user._id}
            title={blog.title}
            description={blog.description}
            imageUrl={blog.image}
            userName={blog.user.name}
          />
        ))}
      </div>
    </div>
  );
};

export default Blogs;
