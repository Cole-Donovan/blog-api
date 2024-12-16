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
    <div className="flex flex-col min-h-screen min-w-screen bg-theme-700">
      <Header onLogout={handleLogout} />
      
      <main className="flex-grow">
        <div className="px-4 py-8 sm:py-12 sm:px-6 mx-auto max-w-screen-xl">
          <Outlet />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default Layout;
