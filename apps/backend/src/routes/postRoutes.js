const express = require('express');
const { getPosts, createPost } = require('../controllers/postController');
const authenticateToken = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', getPosts); // Fetch all posts
router.post('/', authenticateToken, createPost); // Create a post (protected)

module.exports = router;
