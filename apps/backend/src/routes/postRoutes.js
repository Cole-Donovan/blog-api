import express from 'express';
import { getPosts, createPost } from '../controllers/postController.js';
import authenticateToken from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', getPosts); // Fetch all posts
router.post('/', authenticateToken, createPost); // Create a post (protected)

export default router;