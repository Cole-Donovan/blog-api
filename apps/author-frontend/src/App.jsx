import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ProtectedRoute from "./components/ProtectedRoute";
import CreatePostPage from "./pages/CreatePostPage";
import DraftsPage from "./pages/DraftsPage";
import DraftDetailsPage from "./pages/DraftDetailsPage";
import PublishedDetailsPage from "./pages/PublishedDetailsPage"; // Import the new page

function App() {
  const [token, setToken] = useState(null);

  // Check if the user is already logged in when the app loads
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

    // Check for a saved token
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleLogout = () => {
    console.log("Logging out...");

    // Clear token and role from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    // Update state and log out
    setToken(null);

    console.log("Logged out successfully, token and role removed.");
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Wrap all pages in Layout, passing handleLogout to Layout */}
        <Route path="/" element={<Layout onLogout={handleLogout} />}>
          {/* Protected routes for authors */}
          <Route
            index
            element={
              <ProtectedRoute allowedRoles={["AUTHOR"]}>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="create-post"
            element={
              <ProtectedRoute allowedRoles={["AUTHOR"]}>
                <CreatePostPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="drafts"
            element={
              <ProtectedRoute allowedRoles={["AUTHOR"]}>
                <DraftsPage />
              </ProtectedRoute>
            }
          />
          {/* Protected route for viewing a specific draft */}
          <Route
            path="drafts/:id"
            element={
              <ProtectedRoute allowedRoles={["AUTHOR"]}>
                <DraftDetailsPage /> {/* This is the page displaying detailed draft */}
              </ProtectedRoute>
            }
          />
          {/* Protected route for viewing a specific published post */}
          <Route
            path="published/:id"
            element={
              <ProtectedRoute allowedRoles={["AUTHOR"]}>
                <PublishedDetailsPage /> {/* This is the page displaying detailed published post */}
              </ProtectedRoute>
            }
          />
          {/* Public routes */}
          <Route path="login" element={<LoginPage setToken={setToken} />} />
          <Route path="signup" element={<SignUpPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
