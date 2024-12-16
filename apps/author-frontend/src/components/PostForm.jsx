import React, { useState } from "react";

const PostForm = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Indicate loading state

    // Call the parent-provided function to handle the submission
    await onSubmit(title, content);

    setIsSubmitting(false); // Reset loading state
    setTitle(""); // Clear form fields
    setContent("");
  };

  return (
    <div className="shadow-lg rounded-lg p-8 bg-theme-900">
      <h2 className="text-center mb-8">Create Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-3 py-2 rounded border bg-gray-100 focus:outline-none focus:ring-2 focus:ring-theme-700"
          />
        </div>
        <div>
          <label className="block mb-1">Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="h-48 w-full px-3 py-2 rounded border bg-gray-100 focus:outline-none focus:ring-2 focus:ring-theme-700"
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="justify-center mt-6 bg-theme-700 font-semibold py-2 px-8 rounded-lg shadow-md hover:bg-theme-600 focus:outline-none transition"
          >
            <span className="text-base">
              {isSubmitting ? "Submitting..." : "Submit Post"}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
