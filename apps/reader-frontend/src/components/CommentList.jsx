import React from 'react';

const CommentList = ({ comments }) => {
  return (
    <div className="mt-6">
      {comments.length === 0 ? (
        <p className="italic">No comments yet. Be the first to comment!</p>
      ) : (
        <ul className="space-y-6">
          {comments.map((comment) => (
            <li
              key={comment.id}
              className="p-4 rounded-lg shadow-md bg-theme-600"
            >
              {/* Name */}
              <div className="flex items-center mb-2">
                <h3 className="font-semibold text-lg mr-2">
                  {comment.name || "Anonymous"}
                </h3>
                <p className="text-sm"> {new Date(comment.createdAt).toLocaleDateString()}</p>
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
