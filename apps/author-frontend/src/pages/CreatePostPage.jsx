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
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl bg-theme-900 rounded-lg shadow-lg">
        <PostForm onSubmit={handlePostCreation} />
        {success && (
          <div className="mt-4 p-4 bg-green-600 text-white rounded">
            <h3>{success}</h3>
          </div>
        )}
        {error && (
          <div className="mt-4 p-4 bg-red-600 text-white rounded">
            <h3>{error}</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatePostPage;
