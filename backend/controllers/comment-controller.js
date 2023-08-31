import mongoose from 'mongoose';
import Comment from '../model/Comments.js';

// Get all comments for a specific blog
export const getAllCommentsForBlog = async (req, res, next) => {
  const blogId = req.params.blogId;

  try {
    const comments = await Comment.find({ blog: blogId });
    return res.status(200).json({ comments });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error fetching comments' });
  }
};

// Add a comment to a specific blog
export const addCommentToBlog = async (req, res, next) => {
    const { name, content, blog } = req.body;
    
    const comment = new Comment({
      name,
      content,
      blog,
    });
  
    try {
      await comment.save();
      return res.status(200).json({ message: 'Comment added successfully' });
    } catch (err) {
      console.error('Error adding comment:', err);
      return res.status(500).json({ message: 'Error adding comment' });
    }
  };