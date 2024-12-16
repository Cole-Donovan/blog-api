import React from 'react';
import BlogPostList from "../components/BlogPostList";

const DraftsPage = () => {
  return (
    <div>
      <h1 className="text-center">Drafts</h1>
      <BlogPostList viewMode="draft" /> {/* Pass 'draft' to fetch drafts */}
    </div>
  );
};

export default DraftsPage;
