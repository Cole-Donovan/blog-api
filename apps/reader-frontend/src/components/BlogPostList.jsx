import React, { useEffect, useState } from 'react';
import BlogPost from './BlogPost';

const BlogPostList = () => {
  const [posts, setPosts] = useState([]); // State for posts
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(""); // Error state

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true); // Start loading
      try {
        const response = await fetch('http://localhost:3000/posts/published', {
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
  }, []); // No dependencies; run only once when the component mounts

  if (loading) return <div>Loading...</div>; // Show loading state
  if (error) return <div>Error: {error}</div>; // Show error message

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {posts.length === 0 ? (
        <p>No posts available</p> // Show message if no posts
      ) : (
        posts.map((post) => (
          <div key={post.id}>
            <BlogPost post={post} />
          </div>
        ))
      )}
    </div>
  );
};

export default BlogPostList;
