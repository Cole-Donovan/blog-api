import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Import necessary components and pages
import Layout from './components/Layout'; // Assuming Layout is a common component
import HomePage from './pages/HomePage'; // HomePage for listing posts
import PublishedDetailsPage from "./pages/PublishedDetailsPage";

const App = () => {
  useEffect(() => {
    // Apply saved theme as soon as possible
    const savedTheme = localStorage.getItem("theme");

    // If no theme is saved, set the default theme (blue) and save it to localStorage
    if (!savedTheme) {
      document.documentElement.setAttribute("data-theme", "blue");
      localStorage.setItem("theme", "blue"); // Save the default theme
    } else {
      document.documentElement.setAttribute("data-theme", savedTheme); // Apply saved theme
    }
  }, []);

  return (
    <Router>
      <Routes>
        {/* Wrap all pages in Layout */}
        <Route path="/" element={<Layout />}>
          {/* Public route for the home page */}
          <Route index element={<HomePage />} />
          <Route path="published/:id" element={<PublishedDetailsPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
