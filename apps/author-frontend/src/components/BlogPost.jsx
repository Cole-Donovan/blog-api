import React from 'react';
import { Link } from 'react-router-dom';

/**
 * @param {object} post - Post data to display
 * @param {string} viewMode - Determines the fields to display ('draft', 'published', etc.)
 */
const Post = ({ post, viewMode }) => {

  const linkTo =
    viewMode === 'draft'
      ? `/drafts/${post.id}` // For drafts, link to draft route
      : `/published/${post.id}`; // For published, link to published route

  return (
    <Link
      to={linkTo}
      className="block bg-theme-900 p-4 rounded-lg shadow-lg h-80 overflow-hidden relative"
    >
      {/* Comments counter in the upper-right corner */}
      <div className="absolute top-2 right-2 flex items-center justify-center w-8 h-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-8 h-8 fill-theme-600"
        >
          <title>comment</title>
          <path d="M9,22A1,1 0 0,1 8,21V18H4A2,2 0 0,1 2,16V4C2,2.89 2.9,2 4,2H20A2,2 0 0,1 22,4V16A2,2 0 0,1 20,18H13.9L10.2,21.71C10,21.9 9.75,22 9.5,22V22H9Z" />
        </svg>
        <h4 className="absolute top-1 font-bold text-sm">
          {post._count?.comments || 0}
        </h4>
      </div>

      {/* Post Title */}
      <h2>{post.title}</h2>
      <p><strong>Author:</strong> {post.author?.name || post.author?.email || 'Unknown'}</p>
      
      {/* Conditional rendering based on viewMode */}
      {viewMode === "draft" && (
        <p><strong>Created At:</strong> {new Date(post.createdAt).toLocaleDateString()}</p>
      )}
      {viewMode === "published" && (
        <p><strong>Published At:</strong> {new Date(post.publishedAt).toLocaleDateString()}</p>
      )}

      {/* Post Content */}
      <div>
        <p>{post.content}</p>
      </div>

      {/* Absolutely positioned gradient section */}
      <div className="absolute bottom-2 left-0 w-full h-24 bg-gradient-to-b from-transparent to-theme-900 via-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-2 bg-theme-900" />
    </Link>
  );
};

export default Post;
