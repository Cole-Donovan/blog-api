import React from "react";
import { Link } from "react-router-dom";

function Header({ onLogout }) {
  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/create-post">Create Post</Link> {/* Link to the create post page */}
        <Link to="/drafts">Drafts</Link>
        <button onClick={onLogout}>Logout</button> {/* Logout button */}
      </nav>
    </header>
  );
}

export default Header;
