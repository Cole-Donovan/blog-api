import React, { useState } from 'react';

const CommentForm = ({ postId, onCommentSubmit }) => {
  const [commentText, setCommentText] = useState('');
  const [name, setName] = useState('Anonymous'); // Default value for the name
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const apiUrl = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!commentText) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`${apiUrl}/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: commentText,
          name, // Include the name field
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit comment');
      }

      const newComment = await response.json();
      onCommentSubmit(newComment); // Pass new comment to parent
      setCommentText(''); // Clear the comment input field
      setName('Anonymous'); // Reset name field to default
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="mb-6">
      {/* Name Input */}
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name (default: Anonymous)"
        className="w-full p-2 border rounded-md mb-4"
      />
      
      {/* Comment Textarea */}
      <textarea
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Write your comment here..."
        rows="4"
        className="w-full p-2 border rounded-md mb-4"
      />

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-theme-900 font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-theme-800 focus:outline-none transition"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Posting...' : 'Post Comment'}
      </button>

      {/* Error Message */}
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
};

export default CommentForm;
