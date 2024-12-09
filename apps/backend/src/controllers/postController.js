import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


// Fetch all posts
const getPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      where: {
        published: true, // Only fetch published posts
      },
      include: {
        author: {  // Include author (user with role "AUTHOR")
          select: {
            id: true,
            email: true,
            name: true, // Include name if present
          },
        },
        comments: {  // Include comments for each post
          include: {
            user: {  // Include commenter details
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });

    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching posts' });
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
