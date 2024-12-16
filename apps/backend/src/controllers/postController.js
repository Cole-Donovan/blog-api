import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Fetch all published posts
const getPublishedPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      where: {
        published: true, // Filter for published posts
      },
      include: {
        author: { select: { id: true, name: true, email: true } }, // Include author info
      },
    });

    res.status(200).json(posts);
  } catch (err) {
    console.error("Error fetching published posts:", err);
    res.status(500).json({ error: 'Failed to fetch published posts' });
  }
};

// Fetch all draft posts
const getDraftPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      where: {
        published: false, // Filter for draft posts
      },
      include: {
        author: { select: { id: true, name: true, email: true } }, // Include author info
      },
    });

    res.status(200).json(posts);
  } catch (err) {
    console.error("Error fetching draft posts:", err);
    res.status(500).json({ error: 'Failed to fetch draft posts' });
  }
};

// Fetch an individual post by ID
const getPostById = async (req, res) => {
  const { id } = req.params;  // Get the post ID from the URL

  try {
    // Fetch the post with author details
    const post = await prisma.post.findUnique({
      where: { id: Number(id) },
      include: {
        author: { select: { id: true, name: true, email: true } }, // Include author info
      },
    });

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.status(200).json(post);
  } catch (err) {
    console.error("Error fetching post:", err);
    res.status(500).json({ error: 'Error fetching post' });
  }
};

// Create a post (only available for users with "AUTHOR" role)
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
        published: false,  // Default to unpublished
        authorId: req.user.userId, // Link post to the authenticated user (author)
      },
    });

    res.status(201).json(post);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: 'Failed to create post' });
  }
};

// Delete a post by ID
const deletePost = async (req, res) => {
  const { id } = req.params; // Get the post ID from the URL

  try {
    // Ensure the post exists
    const post = await prisma.post.findUnique({
      where: { id: Number(id) },
    });

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Check if the user is the author of the post
    if (post.authorId !== req.user.userId) {
      return res.status(403).json({ error: 'User is not authorized to delete this post' });
    }

    // Delete the post
    await prisma.post.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ error: 'Failed to delete post' });
  }
};

// Edit the content or title of a post
const editPostContent = async (req, res) => {
  const { id } = req.params; // Get the post ID from the URL
  const { title, content } = req.body; // Get the updated title and content

  try {
    // Ensure the post exists
    const post = await prisma.post.findUnique({
      where: { id: Number(id) },
    });

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Check if the user is the author of the post
    if (post.authorId !== req.user.userId) {
      return res.status(403).json({ error: 'User is not authorized to edit this post' });
    }

    // Update the post with the new content and/or title
    const updatedPost = await prisma.post.update({
      where: { id: Number(id) },
      data: {
        ...(title && { title }), // Update title if provided
        ...(content && { content }), // Update content if provided
        updatedAt: new Date(), // Set the 'updatedAt' field to the current time
      },
    });

    // Re-fetch the updated post with the author info
    const postWithAuthor = await prisma.post.findUnique({
      where: { id: Number(id) },
      include: {
        author: { select: { id: true, name: true, email: true } },
      },
    });

    res.status(200).json(postWithAuthor); // Return the updated post with author info
  } catch (error) {
    console.error("Error editing post content:", error);
    res.status(500).json({ error: 'Failed to edit post content' });
  }
};

// Publish a post (update the published status to true)
const publishPost = async (req, res) => {
  const { id } = req.params;  // Get the post ID from the URL

  try {
    // Ensure the post exists
    const post = await prisma.post.findUnique({
      where: { id: Number(id) },
    });

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Check if the user is the author of the post
    if (post.authorId !== req.user.userId) {
      return res.status(403).json({ error: 'User is not authorized to publish this post' });
    }

    // Update the post to set 'published' to true and set the 'publishedAt' field
    const updatedPost = await prisma.post.update({
      where: { id: Number(id) },
      data: { 
        published: true, 
        publishedAt: new Date()  // Set the current timestamp when the post is published
      },
    });

    res.status(200).json(updatedPost);
  } catch (error) {
    console.error("Error publishing post:", error);
    res.status(500).json({ error: 'Failed to publish post' });
  }
};

// Unpublish a post (update the published status to false)
const unpublishPost = async (req, res) => {
  const { id } = req.params; // Get the post ID from the URL

  try {
    // Ensure the post exists
    const post = await prisma.post.findUnique({
      where: { id: Number(id) },
    });

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Check if the user is the author of the post
    if (post.authorId !== req.user.userId) {
      return res.status(403).json({ error: 'User is not authorized to unpublish this post' });
    }

    // Update the post to set 'published' to false and clear 'publishedAt'
    const updatedPost = await prisma.post.update({
      where: { id: Number(id) },
      data: { 
        published: false, 
        publishedAt: null, // Clear the published date
      },
    });

    res.status(200).json(updatedPost);
  } catch (error) {
    console.error("Error unpublishing post:", error);
    res.status(500).json({ error: 'Failed to unpublish post' });
  }
};

export { 
  getPostById, 
  createPost, 
  publishPost, 
  unpublishPost, 
  editPostContent,
  getPublishedPosts, 
  getDraftPosts, 
  deletePost 
};
