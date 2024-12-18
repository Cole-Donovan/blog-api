import React, { useState, useEffect } from 'react';
import CommentList from './CommentList';

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null);      // Error state

  // Fetch comments for the post when the component mounts
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const apiUrl = import.meta.env.VITE_BACKEND_URL;
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

  // Handle comment deletion
  const handleDeleteComment = (commentId) => {
    setComments((prevComments) =>
      prevComments.filter((comment) => comment.id !== commentId)
    );
  };

  return (
    <div className="border-t pt-6">
      <h2 className="text-2xl font-semibold mb-4">Comments</h2>
      {loading && <p>Loading comments...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <CommentList comments={comments} onDeleteComment={handleDeleteComment} postId={postId} />
    </div>
  );
};

export default CommentSection;
