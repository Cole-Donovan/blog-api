
// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import BlogPostList from "../components/BlogPostList";

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to Your Blog</h1>      
      <BlogPostList />
    </div>
  );
};

export default HomePage;
