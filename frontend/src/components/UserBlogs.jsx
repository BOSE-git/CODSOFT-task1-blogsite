import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";
import './UserBlogs.css';
import { BASE_URL } from "./helper";

const UserBlogs = () => {
  const [user, setUser] = useState();
  const id = localStorage.getItem("userId");
  const sendRequest = async () => {
    const res = await axios
      .get(`${BASE_URL}/api/blog/user/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setUser(data.user));
  }, []);
  console.log(user);
  return (
    <div className="userblogs-container">
      {" "}
      {user &&
        user.blogs &&
        user.blogs.map((blog, index) => (
          <Blog
            id={blog._id}
            key={index}
            isUser={true}
            title={blog.title}
            description={blog.description}
            imageUrl={blog.image}
            userName={user.name}
          />
        ))}
    </div>
  );
};

export default UserBlogs;