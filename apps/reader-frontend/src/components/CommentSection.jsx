import React, { useState, useEffect } from 'react';
import CommentList from './CommentList';
import CommentForm from './CommentForm';

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null);      // Error state
  const apiUrl = import.meta.env.VITE_BACKEND_URL;

  // Fetch comments for the post when the component mounts
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`${apiUrl}/posts/${postId}/comments`);
        if (!response.ok) {
          throw new Error('Failed to fetch comments');
        }

        const data = await response.json();
        setComments(data);  // Store fetched comments in state
      } catch (error) {
        setError(error.message);  // Set error message
      } finally {
        setLoading(false);  // Set loading to false once the fetch completes
      }
    };

    fetchComments();
  }, [postId]);

  // Handle new comment addition
  const handleNewComment = (newComment) => {
    setComments((prevComments) => [newComment, ...prevComments]);
  };

  return (
    <div className="border-t pt-6">
      <h2 className="text-2xl font-semibold mb-4">Comments</h2>
      <CommentForm postId={postId} onCommentSubmit={handleNewComment} />
      {loading && <p>Loading comments...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <CommentList comments={comments} />
    </div>
  );
};

export default CommentSection;
