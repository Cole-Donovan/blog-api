import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CommentSection from '../components/CommentSection';

const DraftDetailsPage = () => {
  const { id } = useParams(); // Get the draft ID from the URL
  const navigate = useNavigate();
  const [draft, setDraft] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // To track if we're in edit mode
  const [newTitle, setNewTitle] = useState(''); // To store new title while editing
  const [newContent, setNewContent] = useState(''); // To store new content while editing
  const apiUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchDraft = async () => {
      try {
        const response = await fetch(`${apiUrl}/posts/drafts/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch draft');
        }

        const data = await response.json();
        setDraft(data);
        setNewTitle(data.title); // Initialize the newTitle state with current draft title
        setNewContent(data.content); // Initialize the newContent state with current draft content
      } catch (error) {
        console.error(error);
      }
    };

    fetchDraft();
  }, [id]);

  const handlePublish = async () => {
    try {
      const response = await fetch(`${apiUrl}/posts/${id}/publish`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to publish post');
      }

      alert('Post published!');
      navigate('/drafts'); // Redirect to drafts page after publishing
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this draft?");
      if (!confirmDelete) return;

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

      alert('Draft deleted!');
      navigate('/drafts'); // Redirect to drafts page after deletion
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
          title: newTitle,  // Send the updated title
          content: newContent, // Send the updated content
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update post');
      }

      const updatedPost = await response.json();
      setDraft(updatedPost); // Update the draft with the new title and content
      setIsEditing(false); // Exit edit mode
      alert('Post updated!');
    } catch (error) {
      console.error(error);
    }
  };

  if (!draft) return <div>Loading...</div>;

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
          draft.title
        )}
      </h1>

      <p className="text-lg mb-4"><strong>Author:</strong> {draft.author?.name || draft.author?.email}</p>
      <p className="mb-4"><strong>Created At:</strong> {new Date(draft.createdAt).toLocaleDateString()}</p>

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
          <p>{draft.content}</p>
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

        {/* Button to publish the draft */}
        {!isEditing && (
          <button
            onClick={handlePublish}
            className="bg-theme-900 font-semibold py-2 px-8 rounded-lg shadow-md hover:bg-theme-800 focus:outline-none transition"
          >
            Publish Post
          </button>
        )}

        {/* Button to delete the draft */}
        {!isEditing && (
          <button
            onClick={handleDelete}
            className="bg-theme-900 font-semibold py-2 px-8 rounded-lg shadow-md hover:bg-theme-800 focus:outline-none transition"
          >
            Delete Post
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

export default DraftDetailsPage;
