import React from "react";
import { Link } from "react-router-dom";
import AccountDropdown from "./AccountDropdown";

function Header() {
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
          {/* Add other reader-specific links here, e.g., About, Contact, etc. */}
        </div>

        {/* Account Dropdown - Optional */}
        <div className="flex justify-end flex-1">
          <AccountDropdown />
        </div>
      </nav>
    </header>
  );
}

export default Header;
