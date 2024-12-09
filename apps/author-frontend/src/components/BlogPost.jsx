import React from 'react';

const Post = ({ post }) => {
  return (
    <div key={post.id} className="post">
      <h2>{post.title}</h2>
      <p><strong>Author:</strong> {post.author?.name || post.author?.email || 'Unknown'}</p>
      <p><strong>Published:</strong> Yes</p>
      <p><strong>Created At:</strong> {new Date(post.createdAt).toLocaleDateString()}</p>
      <div>
        <p>{post.content}</p>
      </div>
      <div>
        <h3>Comments:</h3>
        {post.comments?.length > 0 ? (
          <ul>
            {post.comments.map((comment) => (
              <li key={comment.id}>
                <p><strong>{comment.user?.name || 'Anonymous'}</strong> commented:</p>
                <p>{comment.text}</p>
                <p><em>{new Date(comment.createdAt).toLocaleDateString()}</em></p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No comments yet</p>
        )}
      </div>
      <hr />
    </div>
  );
};

export default Post;