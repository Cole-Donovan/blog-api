import React from "react";
import { Link } from "react-router-dom";
import AccountDropdown from "./AccountDropdown";

function Header({ onLogout }) {
  return (
    <header className="bg-theme-800 p-4 shadow-lg text-white">
      <nav className="flex items-center mx-auto max-w-screen-xl w-full">
        {/* Logo or Brand name */}
        <div className="flex justify-start flex-1 text-xl font-semibold hover:text-gray-300">
          <Link to="/">My Blog</Link>
        </div>

        {/* Navigation Links */}
        <div className="flex justify-center flex-1 space-x-6">
          <Link to="/" className="hover:text-gray-300 transition duration-200">Home</Link>
          <Link to="/create-post" className="hover:text-gray-300 transition duration-200">Create Draft</Link>
          <Link to="/drafts" className="hover:text-gray-300 transition duration-200">Drafts</Link>
        </div>

        {/* Account Dropdown */}
        <div className="flex justify-end flex-1">
          <AccountDropdown onLogout={onLogout} />
        </div>
      </nav>
    </header>
  );
}

export default Header;
