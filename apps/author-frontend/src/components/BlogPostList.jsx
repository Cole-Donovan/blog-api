import React, { useEffect, useState } from 'react';
import BlogPost from './BlogPost';


const BlogPostList = ({ viewMode }) => {
  const [posts, setPosts] = useState([]); // State for posts
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(""); // Error state

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true); // Start loading
      try {
        const apiUrl = import.meta.env.VITE_BACKEND_URL;
        const url = viewMode === 'draft' 
          ? '${apiUrl}/posts/drafts'  // For drafts
          : '${apiUrl}/posts/published'; // For published posts

        const response = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Authorization header
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        setPosts(data); // Set posts data
      } catch (error) {
        setError(error.message); // Set error if any
      } finally {
        setLoading(false); // Set loading to false when done
      }
    };

    fetchPosts();
  }, [viewMode]); // Re-run fetch if viewMode changes

  if (loading) return <div>Loading...</div>; // Show loading state
  if (error) return <div>Error: {error}</div>; // Show error message

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {posts.length === 0 ? (
        <p>No posts available</p> // Show message if no posts
      ) : (
        posts.map((post) => {
          console.log('Post:', post); // Log the post object
          console.log('Comments:', post.comments); // Log the comments for the post
          return (
            <div key={post.id}>
              <BlogPost post={post} viewMode={viewMode} />
            </div>
          );
        })
      )}
    </div>
  );
  
};

export default BlogPostList;
