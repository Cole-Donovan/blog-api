import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function Layout({ onLogout }) {
  const navigate = useNavigate(); // Get navigate function here

  const handleLogout = () => {
    // Call the parent onLogout function to clear token and role
    onLogout();

    // Redirect to login page after logout
    navigate("/login");
  };

  return (
    <div>
      <Header onLogout={handleLogout} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
