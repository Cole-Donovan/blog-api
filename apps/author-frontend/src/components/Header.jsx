import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        {/* Add more links here */}
      </nav>
    </header>
  );
}

export default Header;