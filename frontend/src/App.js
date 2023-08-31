
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Auth from './components/Auth';
import Blogs from './components/Blogs';
import UserBlogs from './components/UserBlogs';
import BlogDetail from './components/BlogDetail';
import AddBlog from './components/AddBlog';
import Header from './components/Header';
import BlogPage from './components/BlogPage';
import { useSelector } from 'react-redux';



function App() {
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  console.log(isLoggedIn);
  return (
    <React.Fragment>
      <div className="mega-container">
        <header>
          <Header />
        </header>
        <main>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/myBlogs" element={<UserBlogs />} />
            <Route path="/myBlogs/:id" element={<BlogDetail />} />
            <Route path="/blogs/add" element={<AddBlog />} />
            <Route path="/blogPage" element={<BlogPage />} />
          </Routes>
        </main>
      </div>
    </React.Fragment>
  );
}

export default App;
