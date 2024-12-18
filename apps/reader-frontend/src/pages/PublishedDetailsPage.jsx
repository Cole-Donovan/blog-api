import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CommentSection from '../components/CommentSection';

const PublishedDetailsPage = () => {
  const { id } = useParams(); // Get the post ID from the URL
  const [post, setPost] = useState(null);
  const apiUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`${apiUrl}/posts/published/${id}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch post');
        }

        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPost();
  }, [id]);

  if (!post) return <div>Loading...</div>;

  return (
    <div className="p-6">
      {/* Display title */}
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

      {/* Display author */}
      <p className="text-lg mb-4"><strong>Author:</strong> {post.author?.name || post.author?.email}</p>

      {/* Display published date */}
      <p className="mb-4"><strong>Published At:</strong> {new Date(post.publishedAt).toLocaleDateString()}</p>

      {/* Display post content */}
      <div className="mb-32">
        <p>{post.content}</p>
      </div>
      <CommentSection postId={id} /> {/* Pass postId as id */}
    </div>
  );
};

export default PublishedDetailsPage;
