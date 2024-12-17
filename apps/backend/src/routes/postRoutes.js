import express from 'express';
import { 
  getPublishedPosts, 
  getDraftPosts, 
  getPostById, 
  createPost, 
  publishPost, 
  unpublishPost, 
  deletePost, 
  editPostContent,
  getCommentsByPostId,
  createComment,
  deleteComment // Import the new deleteComment function
} from '../controllers/postController.js';  
import authenticateToken from '../middlewares/authMiddleware.js';

const router = express.Router();

// Route to fetch all published posts (no authentication required)
router.get('/published', getPublishedPosts);

// Route to fetch an individual published post by ID (no authentication required)
router.get('/published/:id', getPostById);

// Route to fetch all draft posts (authentication required)
router.get('/drafts', authenticateToken, getDraftPosts);

// Route to fetch an individual draft post by ID (authentication required)
router.get('/drafts/:id', authenticateToken, getPostById);

// Route to create a post (protected, requires authentication)
router.post('/', authenticateToken, createPost);

// Route to publish a post (protected, requires authentication and authorization)
router.patch('/:id/publish', authenticateToken, publishPost);

// Route to unpublish a post (protected, requires authentication and authorization)
router.patch('/:id/unpublish', authenticateToken, unpublishPost);

// Route to delete a post (protected, requires authentication and authorization)
router.delete('/:id', authenticateToken, deletePost);

// Route to edit a post's content or title (protected, requires authentication and authorization)
router.patch('/:id/edit', authenticateToken, editPostContent);

// Route to fetch all comments for a specific post (no authentication required)
router.get('/:id/comments', getCommentsByPostId);

// Route to create a new comment for a specific post (no authentication required)
router.post('/:id/comments', createComment);

// Route to delete a comment (protected, requires authentication and authorization)
router.delete('/:id/comments/:commentId', authenticateToken, deleteComment);  // Proper format for deleting comment

export default router;
