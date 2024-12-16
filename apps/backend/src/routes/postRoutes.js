import express from 'express';
import { 
  getPublishedPosts, 
  getDraftPosts, 
  getPostById, 
  createPost, 
  publishPost, 
  unpublishPost, 
  deletePost, 
  editPostContent
} from '../controllers/postController.js';  
import authenticateToken from '../middlewares/authMiddleware.js';

const router = express.Router();

// Route to fetch all published posts (no authentication required)
router.get('/published', getPublishedPosts);

// Route to fetch all draft posts (authentication required)
router.get('/drafts', authenticateToken, getDraftPosts);

// Route to fetch an individual post by ID (authentication required)
router.get('/:id', authenticateToken, getPostById);

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

export default router;
