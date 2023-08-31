import express from 'express';
import {
  getAllCommentsForBlog,
  addCommentToBlog,
} from '../controllers/comment-controller.js';

const commentsRouter = express.Router();

// Get all comments for a specific blog
commentsRouter.get('/blog/:blogId', getAllCommentsForBlog);

// Add a comment to a specific blog
commentsRouter.post('/add', addCommentToBlog);

export default commentsRouter;