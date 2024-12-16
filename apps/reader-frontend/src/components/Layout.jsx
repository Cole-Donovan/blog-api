import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function Layout() {
  return (
    <div className="flex flex-col min-h-screen min-w-screen bg-theme-700">
      <Header /> {/* No onLogout needed for now */}
      
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
