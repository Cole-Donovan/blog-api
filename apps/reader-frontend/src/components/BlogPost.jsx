import React from 'react';
import { Link } from 'react-router-dom';

/**
 * @param {object} post - Post data to display
 */
const Post = ({ post }) => {
  // Always link to the published post route
  const linkTo = `/published/${post.id}`;

  return (
    <Link 
      to={linkTo} 
      className="block bg-theme-900 p-4 rounded-lg shadow-lg h-80 overflow-hidden relative"
    >
      <h2>{post.title}</h2>
      <p><strong>Author:</strong> {post.author?.name || post.author?.email || 'Unknown'}</p>
      
      {/* Displaying the published date (if available) */}
      {post.publishedAt && (
        <p><strong>Published At:</strong> {new Date(post.publishedAt).toLocaleDateString()}</p>
      )}

      <div>
        <p>{post.content}</p>
      </div>

      {/* Absolutely positioned gradient section above the gray section */}
      <div className="absolute bottom-2 left-0 w-full h-24 bg-gradient-to-b from-transparent to-theme-900 via-transparent" />
      {/* Absolutely positioned solid gray section */}
      <div className="absolute bottom-0 left-0 w-full h-2 bg-theme-900" />
    </Link>
  );
};

export default Post;
