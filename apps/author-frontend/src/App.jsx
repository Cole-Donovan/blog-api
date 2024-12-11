import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ProtectedRoute from "./components/ProtectedRoute";
import CreatePostPage from "./pages/CreatePostPage";
import DraftsPage from "./pages/DraftsPage";


function App() {
  const [token, setToken] = useState(null);

  // Check if the user is already logged in when the app loads
  useEffect(() => {
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
          {/* Public routes */}
          <Route path="login" element={<LoginPage setToken={setToken} />} />
          <Route path="signup" element={<SignUpPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
