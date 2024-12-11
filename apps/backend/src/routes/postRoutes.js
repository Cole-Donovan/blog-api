import express from 'express';
import { getPosts, createPost } from '../controllers/postController.js';
import authenticateToken from '../middlewares/authMiddleware.js';

const router = express.Router();

// Route to fetch all published posts
router.get('/', getPosts);

// Route to create a post (protected, requires authentication)
router.post('/', authenticateToken, createPost);

export default router;
