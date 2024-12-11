import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


// Fetch all posts
const getPosts = async (req, res) => {
  try {
    const { published } = req.query; // Query parameter for filtering posts

    const posts = await prisma.post.findMany({
      where: {
        ...(published !== undefined && { published: published === 'true' }), // Apply filter if `published` is provided
      },
      include: {
        author: { select: { id: true, name: true, email: true } }, // Include author info (customize as needed)
      },
    });

    res.status(200).json(posts);
  } catch (err) {
    console.error("Error fetching posts:", err);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};



// Create a post
const createPost = async (req, res) => {
  const { title, content } = req.body;

  try {
    // Verify if the user has the "AUTHOR" role
    const user = await prisma.user.findUnique({
      where: { id: req.user.userId },
    });

    if (!user || user.role !== 'AUTHOR') {
      return res.status(403).json({ error: 'User is not authorized to create posts' });
    }

    const post = await prisma.post.create({
      data: {
        title,
        content,
        published: false,  // You can change this logic to handle post publishing status
        authorId: req.user.userId, // Link post to the authenticated user (author)
      },
    });

    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating post' });
  }
};

export { getPosts, createPost };
