import React from 'react';

const CommentList = ({ comments, onDeleteComment, postId }) => {
  // Function to handle the deletion of a comment
  const handleDelete = async (commentId) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this comment?');  // Confirmation dialog

    if (!isConfirmed) return;  // If user cancels, stop the deletion

    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await fetch(`${apiUrl}/posts/${postId}/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming you store token in localStorage
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete comment');
      }

      // Call onDeleteComment to update the parent component's state
      onDeleteComment(commentId);
    } catch (error) {
      console.error(error);
      alert('Failed to delete comment');
    }
  };

  return (
    <div className="mt-6">
      {comments.length === 0 ? (
        <p className="italic">No comments yet. Be the first to comment!</p>
      ) : (
        <ul className="space-y-6">
          {comments.map((comment) => (
            <li
              key={comment.id}
              className="p-4 rounded-lg shadow-md bg-theme-600 transition relative"
            >
              {/* Delete Button */}
              <button
                onClick={() => handleDelete(comment.id)}
                className="absolute top-2 right-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 fill-theme-900">
                  <title>delete</title>
                  <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                </svg>
              </button>

              {/* Name */}
              <div className="flex items-center mb-2">
                <h3 className="font-semibold text-lg mr-2">
                  {comment.name || 'Anonymous'}
                </h3>
                <p className="text-sm">{new Date(comment.createdAt).toLocaleDateString()}</p>
              </div>

              {/* Comment Content */}
              <p>{comment.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CommentList;
