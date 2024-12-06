const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Fetch all posts
const getPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching posts' });
  }
};

// Create a post
const createPost = async (req, res) => {
  const { title, content } = req.body;

  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId: req.user.userId, // userId from authentication middleware
      },
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Error creating post' });
  }
};

module.exports = { getPosts, createPost };
