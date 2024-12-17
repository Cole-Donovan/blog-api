import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CommentSection from '../components/CommentSection';


const PublishedDetailsPage = () => {
  const { id } = useParams(); // Get the post ID from the URL
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // To track if we're in edit mode
  const [newTitle, setNewTitle] = useState(''); // To store new title while editing
  const [newContent, setNewContent] = useState(''); // To store new content while editing
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`${apiUrl}/posts/published/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch post');
        }

        const data = await response.json();
        setPost(data);
        setNewTitle(data.title); // Initialize the newTitle state with current post title
        setNewContent(data.content); // Initialize the newContent state with current post content
      } catch (error) {
        console.error(error);
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this post?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${apiUrl}/posts/${id}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete post');
      }

      navigate('/'); // Redirect to the home page
    } catch (error) {
      console.error(error);
    }
  };

  const handleUnpublish = async () => {
    const confirmUnpublish = window.confirm('Are you sure you want to move this post back to drafts?');
    if (!confirmUnpublish) return;

    try {
      const response = await fetch(`${apiUrl}/posts/${id}/unpublish`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to unpublish post');
      }

      alert('Post moved back to drafts!');
      navigate('/drafts'); // Redirect to the drafts page
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true); // Enable edit mode
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(`${apiUrl}/posts/${id}/edit`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          title: newTitle,
          content: newContent,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update post');
      }
  
      const updatedPost = await response.json();
      setPost(updatedPost);
      setIsEditing(false);
      alert('Post updated!');
    } catch (error) {
      console.error(error);
    }
  };  

  if (!post) return <div>Loading...</div>;

  return (
    <div className="p-6">
      {/* Editable title or plain title based on edit mode */}
      <h1 className="text-3xl font-bold mb-4">
        {isEditing ? (
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-full p-2 border rounded-md mb-4"
          />
        ) : (
          post.title
        )}
      </h1>
  
      <p className="text-lg mb-4"><strong>Author:</strong> {post.author?.name || post.author?.email}</p>
      <p className="mb-4"><strong>Published At:</strong> {new Date(post.publishedAt).toLocaleDateString()}</p>
  
      {/* Display content or editing form */}
      <div className="mb-6">
        {isEditing ? (
          <div>
            <textarea
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              rows="6"
              className="w-full p-2 border rounded-md"
            />
          </div>
        ) : (
          <p>{post.content}</p>
        )}
      </div>
  
      <div className="flex space-x-4 mb-16">
        {/* Button to enable edit mode */}
        {!isEditing && (
          <button
            onClick={handleEdit}
            className="bg-theme-900 font-semibold py-2 px-8 rounded-lg shadow-md hover:bg-theme-800 focus:outline-none transition"
          >
            Edit Post
          </button>
        )}
  
        {/* Button to delete the post */}
        {!isEditing && (
          <button
            onClick={handleDelete}
            className="bg-theme-900 font-semibold py-2 px-8 rounded-lg shadow-md hover:bg-theme-800 focus:outline-none transition"
          >
            Delete Post
          </button>
        )}
  
        {/* Button to unpublish the post */}
        {!isEditing && (
          <button
            onClick={handleUnpublish}
            className="bg-theme-900 font-semibold py-2 px-8 rounded-lg shadow-md hover:bg-theme-800 focus:outline-none transition"
          >
            Unpublish Post
          </button>
        )}
  
        {/* Button to save changes after editing */}
        {isEditing && (
          <button
            onClick={handleSaveChanges}
            className="bg-theme-900 font-semibold py-2 px-8 rounded-lg shadow-md hover:bg-theme-800 focus:outline-none transition"
          >
            Save Changes
          </button>
        )}
      </div>
      <CommentSection postId={id} />
    </div>
  );  
};

export default PublishedDetailsPage;
