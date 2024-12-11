import React from 'react';

/**
 * @param {object} post - Post data to display
 * @param {string} viewMode - Determines the fields to display ('draft', 'published', etc.)
 */
const Post = ({ post, viewMode }) => {
  return (
    <div key={post.id} className="post">
      <h2>{post.title}</h2>
      <p><strong>Author:</strong> {post.author?.name || post.author?.email || 'Unknown'}</p>
      
      {/* Conditional rendering based on viewMode */}
      {viewMode === "draft" && (
        <p><strong>Created At:</strong> {new Date(post.createdAt).toLocaleDateString()}</p>
      )}
      {viewMode === "published" && (
        <p><strong>Published At:</strong> {new Date(post.publishedAt).toLocaleDateString()}</p>
      )}

      <div>
        <p>{post.content}</p>
      </div>
      <hr />
    </div>
  );
};

export default Post;
