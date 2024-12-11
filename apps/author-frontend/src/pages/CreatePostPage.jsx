import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PostForm from "../components/PostForm";

const CreatePostPage = () => {
  const [error, setError] = useState(""); // Error state
  const [success, setSuccess] = useState(""); // Success state
  const navigate = useNavigate(); // Hook for navigation

  // Handle post creation logic
  const handlePostCreation = async (title, content) => {
    try {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage

      const response = await fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Attach token for authentication
        },
        body: JSON.stringify({ title, content }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Post created successfully!"); // Show success message
        setError(""); // Clear any previous error
        navigate("/drafts");
      } else {
        setError(data.error || "Failed to create post"); // Show error message
      }
    } catch (err) {
      setError("Failed to connect to the backend"); // Show connection error
    }
  };

  return (
    <div>
      <h1>Create New Post</h1>
      <PostForm onSubmit={handlePostCreation} />
      {success && (
        <div style={{ marginTop: "20px", color: "green" }}>
          <h3>{success}</h3>
        </div>
      )}
      {error && (
        <div style={{ marginTop: "20px", color: "red" }}>
          <h3>{error}</h3>
        </div>
      )}
    </div>
  );
};

export default CreatePostPage;
